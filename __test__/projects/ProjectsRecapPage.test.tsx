import ProjectsRecapPage from "@/app/dashboard/page";
import { getProjectsAssociatedWithUser } from "@/app/utils/service/userRelation";
import { render, screen } from "@testing-library/react";
import exp from "constants";
import { getServerSession } from "next-auth";
import { act } from "react-dom/test-utils";

export default async function resolvedComponent(Component: any, props?: any) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

jest.mock("@radix-ui/themes", () => ({
  Flex: jest.fn(({ children }) => <div>{children}</div>),
  Heading: jest.fn(({ children }) => <h1>{children}</h1>),
}));

jest.mock("../../app/utils/service/styleFunction", () => ({
  getRandomColor: jest.fn(() => "#123456"),
}));

const mockSession = {
  expires: "1231",
  user: { id: "5" },
};

jest.mock("next-auth"); // Add any other modules you want to mock
jest.mock("../../app/utils/service/userRelation.ts");

describe("ProjectsRecapPage Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve projects associated with the user using getProjectsAssociatedWithUser", async () => {
    const getServerSessionMock = jest.spyOn(
      getServerSession as any,
      "mockResolvedValueOnce"
    );
    getServerSessionMock.mockResolvedValueOnce({
      user: { email: "test@example.com" },
    });

    const getProjectsAssociatedWithUserMock = jest.spyOn(
      getProjectsAssociatedWithUser as any,
      "mockResolvedValueOnce"
    );
    getProjectsAssociatedWithUserMock.mockResolvedValueOnce([]);

    const ProjectsRecapPageResolved = await resolvedComponent(
      ProjectsRecapPage
    );
    render(<ProjectsRecapPageResolved />);
    expect(getServerSessionMock).toHaveBeenCalled();
    expect(getProjectsAssociatedWithUserMock).toHaveBeenCalledWith({
      user: { email: "test@example.com" },
    });
    expect("C'est vide par ici...").toBeInTheDocument();
  });
});

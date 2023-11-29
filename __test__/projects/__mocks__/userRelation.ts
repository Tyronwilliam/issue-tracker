// __mocks__/userRelation.js

export const getProjectsAssociatedWithUser = jest.fn(async (session) => {
  // Customize the mock behavior as needed for testing
  // For example, you can return some mocked data
  return [
    {
      id: 1,
      name: "Mocked Project 1",
      issueId: [{ timer: 10, status: "OPEN" }],
    },
    {
      id: 2,
      name: "Mocked Project 2",
      issueId: [{ timer: 5, status: "CLOSED" }],
    },
  ];
});

import { Request, Response } from "express";

import { ProjectService } from "../services/project.service";
import { createProject } from "../controllers/project.controller";
import { CreateProjectDTO, ProjectResponseDTO } from "../dtos/project.dto";
import { UserResponseDTO } from "../dtos/user.dto";

describe("getProjects Controller", () => {
  let projectService: ProjectService;

  beforeEach(() => {
    projectService = {
      getProjects: jest.fn(),
    } as unknown as ProjectService;
  });

  it("should mock getProjects", async () => {
    // Define mock response
    const mockResponse = [
      { id: 1, name: "Project 1" },
      { id: 2, name: "Project 2" },
    ];

    (projectService.getProjects as jest.Mock).mockResolvedValue(mockResponse);

    // Call the method
    const page = 1;
    const limit = 10;
    const response = await projectService.getProjects(page, limit);

    // Assertions
    expect(projectService.getProjects).toHaveBeenCalledWith(page, limit);
    expect(response).toEqual(mockResponse);
  });
});

// describe("createProject Controller", () => {
//   let projectService: ProjectService;
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let responseObject: any;

//   beforeEach(() => {
//     projectService = {
//       createProject: jest.fn(),
//     } as unknown as ProjectService;

//     mockRequest = {
//       body: {},
//       user: { id: "1" },
//     };

//     responseObject = {};
//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockImplementation((data) => {
//         responseObject = data;
//         return mockResponse;
//       }),
//     };

//     jest.clearAllMocks();
//   });

//   it("should create a project successfully and return 201 status", async () => {
//     const dto: CreateProjectDTO = {
//       name: "Test Project",
//       description: "Test Description",
//       userId: 1,
//       startDate: "",
//       endDate: "",
//     };

//     const createdProject: ProjectResponseDTO = {
//       id: 1,
//       name: "Test Project",
//       description: "Test Description",
//       user: { id: 1, email: "test@gmail.com", firstName: "", lastName: "", roleName: "" } as UserResponseDTO,
//       startDate: "",
//       endDate: "",
//       tasks: [],
//     };

//     mockRequest.body = dto;
//     (projectService.createProject as jest.Mock).mockResolvedValue(createdProject);
//     await createProject(mockRequest as Request, mockResponse as Response);

//     expect(mockResponse.status).toHaveBeenCalledWith(201);
//     expect(mockResponse.json).toHaveBeenCalledWith(createdProject);
//     expect(responseObject).toEqual(createdProject);
//   });
// });

//   it("GET /projects/:id - should return one project", async () => {
//     const req = { params: { id: "1" } } as unknown as Request;
//     const res = mockRes();
//     const project = { id: 1, name: "Single Project" } as Project;

//     mockService.getProjectById = jest.fn().mockResolvedValue(project);
//     (projectController as any).projectService = mockService;

//     await projectController.getProjectById(req, res);
//     expect(res.json).toHaveBeenCalledWith(project);
//   });

//   it("POST /projects - should create a project", async () => {
//     const req = {
//       body: { name: "New Project" },
//       user: { id: 1 },
//     } as any;
//     const res = mockRes();
//     const created = {
//       id: 1,
//       name: "New Project",
//       description: "",
//       startDate: "2025-04-01",
//       endDate: "2025-04-02",
//       user: { id: 1, email: "test@gmail.com", firstName: "test", lastName: "user", roleName: "developer" } as UserResponseDTO,
//     } as ProjectResponseDTO;

//     mockService.createProject.mockResolvedValue(created);
//     (projectController as any).projectService = mockService;

//     await projectController.createProject(req, res);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(created);
//   });

//   it("PUT /projects/:id - should update a project", async () => {
//     const req = {
//       params: { id: "1" },
//       body: { name: "Updated Project" },
//       user: { id: 1 },
//     } as any;
//     const res = mockRes();
//     const updated = {
//       id: 1,
//       name: "New Project",
//       description: "",
//       startDate: "2025-04-01",
//       endDate: "2025-04-02",
//       user: { id: 1, email: "test@gmail.com", firstName: "test", lastName: "user", roleName: "developer" } as UserResponseDTO,
//     } as ProjectResponseDTO;

//     mockService.updateProject.mockResolvedValue(updated);
//     (projectController as any).projectService = mockService;

//     await projectController.updateProject(req, res);
//     expect(res.json).toHaveBeenCalledWith(updated);
//   });

//   it("DELETE /projects/:id - should delete a project", async () => {
//     const req = {
//       params: { id: "1" },
//       user: { id: 1 },
//     } as any;
//     const res = mockRes();

//     mockService.deleteProject.mockResolvedValue();
//     (projectController as any).projectService = mockService;

//     await projectController.deleteProject(req, res);
//     expect(res.status).toHaveBeenCalledWith(204);
//     expect(res.json).toHaveBeenCalledWith();
//   });

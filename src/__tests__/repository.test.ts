import { DataSource, Repository } from "typeorm";
import { projectRepo } from "../repositories/project.repository";
import * as dataSourceModule from "../data-source";
import { Project } from "../models/project.entity";

jest.mock("../data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("projectRepo", () => {
  const mockGetRepository = dataSourceModule.AppDataSource.getRepository as jest.Mock;

  beforeEach(() => {
    mockGetRepository.mockClear();
  });

  it("should export a Project entity repository", () => {
    const mockRepo = {} as Repository<Project>;
    mockGetRepository.mockReturnValue(mockRepo);

    expect(projectRepo).toBe(mockRepo);
    expect(mockGetRepository).toHaveBeenCalledWith(Project);
  });
});

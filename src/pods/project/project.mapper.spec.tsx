import { mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('mapProjectFromApiToVm', () => {
  it('debería mapear un proyecto con empleados correctamente', () => {
    const projectApi: apiModel.Project = {
      id: '1',
      name: 'Proyecto Test',
      externalId: 'EXT-123',
      comments: 'Comentario de prueba',
      isActive: true,
      employees: [
        { id: 'emp-1', isAssigned: true, employeeName: 'Juan' },
        { id: 'emp-2', isAssigned: false, employeeName: 'Ana' },
      ],
    };

    const expected: viewModel.Project = {
      ...projectApi,
      employees: [
        { id: 'emp-1', isAssigned: true, employeeName: 'Juan' },
        { id: 'emp-2', isAssigned: false, employeeName: 'Ana' },
      ],
    };

    const result = mapProjectFromApiToVm(projectApi);
    expect(result).toEqual(expected);
  });

  it('debería devolver un proyecto vacío si project es null', () => {
    const emptyProject: viewModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    jest.spyOn(viewModel, 'createEmptyProject').mockReturnValue(emptyProject);

    const result = mapProjectFromApiToVm(null as any);
    expect(viewModel.createEmptyProject).toHaveBeenCalled();
    expect(result).toEqual(emptyProject);
  });

  it('Empty proyect if Project is undefined', () => {
    const emptyProject: viewModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };
    jest.spyOn(viewModel, 'createEmptyProject').mockReturnValue(emptyProject);

    const result = mapProjectFromApiToVm(undefined as any);

    expect(viewModel.createEmptyProject).toHaveBeenCalled();
    expect(result).toEqual(emptyProject);
  });
});

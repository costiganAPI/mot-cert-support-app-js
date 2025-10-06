// tests/ManageProjects.test.tsx
import { MemoryRouter } from 'react-router-dom';
import ManageProjects from '../components/ManageProjects';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import nock from 'nock';

// === Mock Data ===
const mockProjects = [
    {
        id: '1',
        name: 'Project 1',
        description: 'This is the first project',
    },
    {
        id: '2',
        name: 'Project 2',
        description: 'This is the second project',
    },
];

// === Helper Functions ===
function mockGetProjects() {
    return nock('http://localhost')
        .get('/v1/project')
        .reply(200, mockProjects);
}

function renderComponent() {
    return render(
        <MemoryRouter>
            <ManageProjects />
        </MemoryRouter>
    );
}

describe('ManageProjects', () => {
    afterEach(() => {
        nock.cleanAll(); // 🔍 Ensure no cross-test interference
    });

    it('renders project list correctly', async () => {
        mockGetProjects();

        const { asFragment } = renderComponent();

        // Wait until the project names appear
        await screen.findByText('Project 1');
        expect(asFragment()).toMatchSnapshot();
    });

    it('sends the correct request to delete a project', async () => {
        mockGetProjects();

        const deleteMock = nock('http://localhost')
            .delete('/v1/project/1')
            .reply(200, {});

        renderComponent();

        await screen.findByText('Project 1');

        fireEvent.click(screen.getByTestId('del-project-1'));

        await waitFor(() => {
            expect(deleteMock.isDone()).toBeTruthy();
        });
    });

    it('sends the correct request to add a project', async () => {
        mockGetProjects();

        const newProject = {
            name: 'Project 3',
            description: 'This is the third project',
        };

        const createMock = nock('http://localhost')
            .post('/v1/project', newProject)
            .reply(200, {});

        renderComponent();

        await screen.findByText('Project 1');

        fireEvent.change(screen.getByTestId('project-name'), {
            target: { value: newProject.name },
        });

        fireEvent.change(screen.getByTestId('project-description'), {
            target: { value: newProject.description },
        });

        fireEvent.click(screen.getByTestId('add-project'));

        await waitFor(() => {
            expect(createMock.isDone()).toBeTruthy();
        });
    });
});

import { MemoryRouter } from 'react-router-dom';
import ManageProjects from '../components/ManageProjects';
import { render, fireEvent, waitFor } from '@testing-library/react';
import nock from 'nock';

describe('ManageProjects', () => {

    nock('http://localhost')
        .get('/v1/project')
        .reply(200, [{
            "id" : "1", 
            "name" : "Project 1",
            "description" : "This is the first project" 
        },{
            "id" : "2",
            "name" : "Project 2",
            "description" : "This is the second project" 
        }]);

    it('renders correctly', () => {            
        const {asFragment} = render(<MemoryRouter>
            <ManageProjects />
        </MemoryRouter>);

        expect(asFragment()).toMatchSnapshot();
    });

    it('sends the correct request to delete a project' , async () => {
        const deleteMock = nock('http://localhost')
                            .delete('/v1/project/1')
                            .reply(200, {});

        const {getByTestId, findByText} = render(<MemoryRouter>
            <ManageProjects />
        </MemoryRouter>);

        await findByText('Project 1');

        await fireEvent.click(getByTestId("del-project-1"));

        await waitFor(() => expect(deleteMock.isDone()).toBeTruthy());
    });

    it('send the correct request to add a project', async () => {
        const createMock = nock('http://localhost')
                            .post('/v1/project', {
                                "name" : "Project 3",
                                "description" : "This is the third project"
                            })
                            .reply(200, {});

        const {getByTestId, findByText} = render(<MemoryRouter>
            <ManageProjects />
        </MemoryRouter>);

        await findByText('Project 1');

        await fireEvent.change(getByTestId("project-name"), {target: {value: "Project 3"}});
        await fireEvent.change(getByTestId("project-description"), {target: {value: "This is the third project"}});
        await fireEvent.click(getByTestId("add-project"));

        await waitFor(() => expect(createMock.isDone()).toBeTruthy());
    });
});
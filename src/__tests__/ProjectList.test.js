import ProjectList from '../components/ProjectList';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';

nock('http://localhost')
   .persist()
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


describe('ProjectList', () => {
   it('renders the list of projects correctly', async () => {
       const {asFragment, findByText} = render(<MemoryRouter>
           <ProjectList />
       </MemoryRouter>);

       await findByText('Project 1');

       expect(asFragment()).toMatchSnapshot();
   });
});


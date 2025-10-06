import { MemoryRouter } from 'react-router-dom';
import Report from '../../src/components/Report';
import { render } from '@testing-library/react';
import nock from 'nock';

describe('Report component', () => {

    beforeEach(() => {
        // Clean up all nock interceptors before each test
        nock.cleanAll();
    });

    it('renders the Report component without crashing', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Report />
            </MemoryRouter>
        );

        // This assumes there's a heading or static text in the Report
        expect(getByText(/report/i)).toBeInTheDocument();
    });

    it('renders a single project in the report', async () => {
        nock('http://localhost')
            .get('/v1/report')
            .reply(200, {
                total: 5,
                projects: [{
                    id: 1,
                    name: 'Project 1',
                    hours: 5
                }]
            });

        const { findByText } = render(
            <MemoryRouter>
                <Report />
            </MemoryRouter>
        );

        // Wait for the project name and total to render
        await findByText('Project 1');
        await findByText('5 hours');
        await findByText('Total: 5 hours'); // If this text exists
    });

    it('renders multiple projects in the report', async () => {
        nock('http://localhost')
            .get('/v1/report')
            .reply(200, {
                total: 10,
                projects: [
                    { id: 1, name: 'Project 1', hours: 7 },
                    { id: 2, name: 'Project 2', hours: 5 }
                ]
            });

        const { findByText } = render(
            <MemoryRouter>
                <Report />
            </MemoryRouter>
        );

        await findByText('Project 1');
        await findByText('Project 2');
        await findByText('Total: 10 hours'); // Assuming you show this somewhere
    });

});

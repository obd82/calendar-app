import React from 'react';
import { render, screen } from '@/utils/test-utils.js';
import EventModal from './EventModal';
import { fireEvent, waitFor } from '@testing-library/dom';

const mockClose = vi.fn();

describe('EventModal', () => {
    it.each(['edit', 'create'])('should render %s event title when opening %s type modal', (type) => {
        const opened = true;
        const eventData = {};
        render(<EventModal type={type} close={mockClose} opened={opened} eventData={eventData} />)

        if (type === 'edit') {
            const title = screen.getByRole('heading', { name: /Edit event/i });
            expect(title).toBeInTheDocument();
        } else {
            const title = screen.getByRole('heading', { name: /Create event/i });
            expect(title).toBeInTheDocument();
        }
    });
    it('should delete the event when the "Delete" button is clicked', async () => {
        const deleteEventByIdMock = vi.fn();
        const eventData = { _id: '123' };
        render(<EventModal type="edit" close={mockClose} opened={true} eventData={eventData} />);

        const title = screen.getByRole('heading', { name: /Edit event/i });
        const deleteButton = screen.getByRole('button', { name: /Delete/i })

        await fireEvent.click(deleteButton);

        expect(title).toBeInTheDocument();
        waitFor(() => {
            expect(deleteEventByIdMock).toHaveBeenCalledWith({ id: '123' })
            expect(mockClose).toBeCalledTimes(1)
        });
    });
    it('should populate form with correct data when editing an event', () => {
        const eventData = {
            _id: '123',
            title: 'Test Event',
            description: 'Test Description',
            note: 'Test Note',
            startTime: '2022-01-01T00:00:00Z',
            isFullDay: false,
            endTime: '2022-01-01T01:00:00Z',
            repeat: 'none',
            repeatCycle: 1,
        };
        render(<EventModal type="edit" close={mockClose} opened={true} eventData={eventData} />);
        expect(screen.getByTestId('title').value).toEqual('Test Event');
        expect(screen.getByTestId('description').value).toEqual('Test Description');
        expect(screen.getByTestId('note').value).toEqual('Test Note');
        expect(screen.getByTestId('fullDayEvent').checked).toEqual(false);
        expect(screen.getByTestId('repeat').value).toEqual('None');
    });
    it('should submit form with valid data and call the correct mutation function', async () => {
        const updateEventById = vi.fn();
        const form = {
            onSubmit: vi.fn(),
            values: {
                title: 'Test Event',
                description: 'Test Description',
                note: 'Test Note',
                startTime: '2022-01-01T00:00:00.000Z',
                isFullDay: false,
                endTime: '2022-01-01T01:00:00.000Z',
                repeat: 'none',
                repeatCycle: 1,
            },
            getInputProps: vi.fn().mockReturnValue({ value: '' }),
            reset: vi.fn(),
            setInitialValues: vi.fn(),
            setValues: vi.fn(),
            setFieldValue: vi.fn(),
        };
        render(
            <EventModal
                type="create"
                close={mockClose}
                opened={true}
                eventData={{}}
            />
        );
        await fireEvent.change(screen.getByTestId('title'), { target: { value: 'Test Event' } });
        await fireEvent.change(screen.getByTestId('description'), { target: { value: 'Test Description' } });
        await fireEvent.change(screen.getByTestId('note'), { target: { value: 'Test Note' } });
        await fireEvent.change(screen.getByTestId('startDateTime'), { target: { value: '2022-01-01T00:00:00.000Z' } });
        await fireEvent.change(screen.getByTestId('endDateTime'), { target: { value: '2022-01-01T01:00:00.000Z' } });
        await fireEvent.submit(screen.getByText('Save'));
        waitFor(() => {
            expect(updateEventById).toHaveBeenCalledWith({ values: form.values });
            expect(form.reset).toHaveBeenCalled();
            expect(close).toHaveBeenCalled();
        })
    });
    it('should display the repeat cycle field when repeat is not "none"', async () => {
        render(<EventModal type="create" close={mockClose} opened={true} />);
        const repeatSelect = screen.getByTestId("repeat");
        expect(screen.queryByTestId("repeatCycle")).not.toBeInTheDocument();
        await fireEvent.change(repeatSelect, { targe: { value: 'weekly' } })
        waitFor(() => {
            expect(screen.queryByTestId("repeatCycle")).toBeInTheDocument();
        })
    });
    it('should display the end time field only when "Full Day Event" switch is off', async () => {
        render(<EventModal type="create" close={mockClose} opened={true} />);
        expect(screen.getByTestId('endDateTime').value).toBe('');
        expect(screen.queryByLabelText('End Date Time')).not.toBeInTheDocument();
        await fireEvent.click(screen.getByLabelText('Full Day Event'));
        waitFor(() => { expect(screen.queryByLabelText('End Date Time')).toBeInTheDocument() });
    });
    it('should display an error message when start time is not provided', async () => {
        const eventData = {};
        render(
            <EventModal type="create" close={mockClose} opened={true} eventData={eventData} />
        );
        const startTimeInput = screen.getByTestId('startDateTime');
        const saveButton = screen.getByText('Save');
        const errorMessage = screen.queryByText('Invalid Start Time');

        expect(errorMessage).not.toBeInTheDocument();
        await fireEvent.change(startTimeInput, { target: { value: '' } });
        await fireEvent.click(saveButton);
        waitFor(() => { expect(errorMessage).toBeInTheDocument() });
    });
    it('should display an error message when title is not provided', () => {
        const eventData = {};
        render(
            <EventModal type="create" close={mockClose} opened={true} eventData={eventData} />
        );
        const titleInput = screen.getByTestId('title');
        const submitButton = screen.getByText('Save');
        fireEvent.click(submitButton);
        expect(titleInput).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByText('Invalid title')).toBeInTheDocument();
    });
});

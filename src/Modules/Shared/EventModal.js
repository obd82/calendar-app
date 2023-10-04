import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextInput, Group, Switch, Select, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import moment from 'moment';
import { createEvent } from '../../redux/event/event.thunk';

const EventModal = ({ type, close, opened, eventData = {}, eventList }) => {
    const { _id } = eventData;

    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            note: '',
            end: '',
            allDay: false,
            dtstart: '',
            freq: 'none',
            interval: 1,
        },
        validate: {
            title: (value) => value ? null : 'Invalid title',
            dtstart: (value) => value ? null : 'Invalid Start Time',
        },
    });

    useEffect(() => {
        if (eventData && type === 'edit') {
            const data = {
                ...eventData,
            }
            form.setInitialValues(data)
            form.setValues(data)
            form.setFieldValue(data)
        }
    }, [eventData]);

    const handleCreateEvent = () => {
        const transformedData = {
            ...form.values,
            start: moment(form.getInputProps('dtstart').value).toISOString(),
        }
        return dispatch(createEvent({
            ...transformedData
        }));
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => {
                    form.reset()
                    close();
                }}
                centered
                closeOnClickOutside={false}
                width={350}
                size={'xs'}
                title={type === 'edit' ? "Edit Event" : "Create Event"}
            >
                <form onSubmit={form.onSubmit(handleCreateEvent)}>
                    <TextInput
                        data-autofocus
                        withAsterisk
                        size="xs"
                        label="Title"
                        data-testid='title'
                        placeholder="Event Title"
                        error="both below the input"
                        inputWrapperOrder={['label', 'input', 'error']}
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        label="Description"
                        data-testid='description'
                        placeholder="Event Description"
                        size="xs"
                        mt="xs"
                        inputWrapperOrder={['label', 'input', 'error']}
                        {...form.getInputProps('description')}
                    />
                    <TextInput
                        label="Note"
                        data-testid='note'
                        placeholder="Event Note"
                        size="xs"
                        mt="xs"
                        inputWrapperOrder={['label', 'input', 'error']}
                        {...form.getInputProps('note')}
                    />
                    <DateTimePicker
                        withAsterisk
                        mt="xs"
                        size="xs"
                        label="Start Date Time"
                        data-testid='startDateTime'
                        placeholder="Pick event start date and time"
                        {...form.getInputProps('dtstart')}
                    />
                    <Switch
                        label="Full Day Event"
                        data-testid='fullDayEvent'
                        size="xs"
                        mt="xs"
                        {...form.getInputProps('allDay')}
                    />
                    {!form.getInputProps('allDay').value &&
                        <DateTimePicker
                            withAsterisk
                            mt="xs"
                            size="xs"
                            label="End Date Time"
                            data-testid='endDateTime'
                            placeholder="Pick event end date and time"
                            {...form.getInputProps('end')}
                        />
                    }
                    <Select
                        label="Repeat"
                        data-testid='repeat'
                        size="xs"
                        mt="xs"
                        placeholder="Select repeat"
                        defaultValue='none'
                        data={[
                            { label: 'None', value: 'none' },
                            { label: 'Daily', value: 'daily' },
                            { label: 'Weekly', value: 'weekly' },
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Yearly', value: 'yearly' },
                        ]}
                        {...form.getInputProps('freq')}
                    />
                    {form.getInputProps('freq').value !== 'none' &&
                        <Select
                            label="Repeat Cycle"
                            data-testid='repeatCycle'
                            size="xs"
                            mt="xs"
                            placeholder="Select repeat cycle"
                            data={[
                                { label: '', value: '1' },
                                { label: 'Bi ' + form.getInputProps('freq').value, value: '2' },
                                { label: 'Tri ' + form.getInputProps('freq').value, value: '3' },
                                { label: 'Quarter ' + form.getInputProps('freq').value, value: '4' },
                            ]}
                            {...form.getInputProps('interval')}
                        />
                    }

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Save</Button>
                        {type === 'edit' && <Button onClick={() => "deleteEventById({ id: _id })"} type="button" color="red">Delete</Button>}
                    </Group>
                </form>
            </Modal>
        </>
    );
};

export default EventModal;

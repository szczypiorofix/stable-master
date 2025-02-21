import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';
import { Button } from '../components/button/Button.component.tsx';

type ButtonStoryProps = ComponentProps<typeof Button> & {
    contentText: string;
};

const meta: Meta<ButtonStoryProps> = {
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['primary', 'secondary'],
            control: {
                type: 'select',
            },
        },
        size: {
            options: ['xs', 'sm', 'md', 'lg'],
            control: {
                type: 'select',
            },
        },
    },
    args: {
        onClick: fn(),
    },
};

export default meta;

type Story = StoryObj<ButtonStoryProps>;

export const Container: Story = {
    args: {
        contentText: 'Container button',
        variant: 'contained',
        size: 'md',
    },
    render: ({ contentText, ...args }) => {
        return <Button {...args}>{contentText}</Button>;
    },
};

export const Outlined: Story = {
    args: {
        contentText: 'Outlined button',
        variant: 'outlined',
        size: 'md',
    },
    render: ({ contentText, ...args }) => {
        return <Button {...args}>{contentText}</Button>;
    },
};

export const Text: Story = {
    args: {
        contentText: 'Text button',
        variant: 'text',
        size: 'md',
    },
    render: ({ contentText, ...args }) => {
        return <Button {...args}>{contentText}</Button>;
    },
};

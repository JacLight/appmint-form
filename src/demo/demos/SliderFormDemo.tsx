import React, { useState } from 'react';
import CollectionForm from '../../library/form-view';

// Schema for the slider form demo
const schema = {
    type: 'object',
    title: 'TypeForm-like Slider Form Demo',
    'x-layout': {
        main: {
            type: 'slide',
            id: 'main',
            autoProgress: true,
            autoProgressDelay: 1500,
            loop: false,
            items: [
                { id: 'welcome', title: 'Welcome' },
                { id: 'personal-info', title: 'Personal Information' },
                { id: 'contact-info', title: 'Contact Information' },
                { id: 'preferences', title: 'Preferences' },
                { id: 'feedback', title: 'Feedback' },
                { id: 'completion', title: 'Completion' }
            ]
        }
    },
    properties: {
        // Welcome slide
        welcome: {
            type: 'null',
            title: 'Welcome to our Form',
            'x-control': 'paragraph',
            'x-content': 'This is a demonstration of the TypeForm-like slider form animation. Fill out each section and the form will automatically progress to the next slide. You can also use the navigation controls to move between slides.',
            layoutGroup: 'x-layout.main.items.0'
        },

        // Personal Information slide
        fullName: {
            type: 'string',
            title: 'Full Name',
            description: 'Please enter your full name',
            inputRequired: true,
            layoutGroup: 'x-layout.main.items.1'
        },
        age: {
            type: 'number',
            title: 'Age',
            description: 'How old are you?',
            minimum: 18,
            maximum: 120,
            layoutGroup: 'x-layout.main.items.1'
        },

        // Contact Information slide
        email: {
            type: 'string',
            title: 'Email Address',
            description: 'Please enter your email address',
            format: 'email',
            'x-control': 'email',
            inputRequired: true,
            layoutGroup: 'x-layout.main.items.2'
        },
        phone: {
            type: 'string',
            title: 'Phone Number',
            description: 'Please enter your phone number',
            'x-control': 'phone',
            layoutGroup: 'x-layout.main.items.2'
        },

        // Preferences slide
        favoriteColor: {
            type: 'string',
            title: 'Favorite Color',
            description: 'Pick your favorite color',
            'x-control': 'color',
            default: '#3b82f6',
            layoutGroup: 'x-layout.main.items.3'
        },
        interests: {
            type: 'array',
            title: 'Interests',
            description: 'Select your interests',
            'x-control': 'selectmany',
            dataSource: {
                source: 'json',
                value: [
                    'Technology',
                    'Art',
                    'Music',
                    'Sports',
                    'Reading',
                    'Travel',
                    'Cooking',
                    'Gaming'
                ]
            },
            layoutGroup: 'x-layout.main.items.3'
        },

        // Feedback slide
        rating: {
            type: 'number',
            title: 'Experience Rating',
            description: 'How would you rate your experience?',
            'x-control': 'rating',
            minimum: 1,
            maximum: 5,
            layoutGroup: 'x-layout.main.items.4'
        },
        feedback: {
            type: 'string',
            title: 'Feedback',
            description: 'Please provide any additional feedback',
            'x-control': 'richtext',
            layoutGroup: 'x-layout.main.items.4'
        },

        // Completion slide
        completion: {
            type: 'null',
            title: 'Thank You!',
            'x-control': 'notice',
            'x-content': 'Thank you for completing the form. Your responses have been recorded.',
            'x-notice-type': 'success',
            layoutGroup: 'x-layout.main.items.5'
        }
    }
};

const SliderFormDemo: React.FC = () => {
    const [formData, setFormData] = useState({});

    const handleFormChange = (data) => {
        setFormData(data);
        console.log('Form data updated:', data);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">TypeForm-like Slider Form</h1>

            <CollectionForm
                schema={schema}
                id="slider-form-demo"
                data={formData}
                onChange={handleFormChange}
            />

            <div className="mt-8 text-sm text-gray-500">
                <p className="mb-2">Features demonstrated:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Smooth slide animations between form sections</li>
                    <li>Auto-progression when fields are filled</li>
                    <li>Keyboard navigation (arrow keys)</li>
                    <li>Progress indicator</li>
                    <li>Validation before progression</li>
                    <li>Responsive design</li>
                </ul>
            </div>
        </div>
    );
};

export default SliderFormDemo;

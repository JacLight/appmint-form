import React from 'react';
import CollectionForm from '../../library/form-view';

const schema = {
    type: 'object',
    properties: {
        number: {
            type: 'number',
            title: 'Number Field',
            description: 'Basic number input',
            default: 42
        },
        numberWithMinMax: {
            type: 'number',
            title: 'Number with Min/Max',
            description: 'Number input with minimum and maximum constraints',
            minimum: 0,
            maximum: 100,
            default: 50
        },
        numberWithStep: {
            type: 'number',
            title: 'Number with Step',
            description: 'Number input with step value',
            minimum: 0,
            maximum: 100,
            multipleOf: 5,
            default: 25
        },
        slider: {
            type: 'number',
            title: 'Slider',
            description: 'Slider input for selecting a number',
            'x-control-variant': 'slider',
            minimum: 0,
            maximum: 100,
            default: 50
        },
        numberRange: {
            type: 'object',
            title: 'Number Range',
            description: 'Range input for selecting a range of numbers',
            'x-control': 'numberrange',
            default: [30, 80]
        },
        sliderRange: {
            type: 'array',
            title: 'Number Range',
            description: 'Range input for selecting a range of numbers',
            'x-control': 'numberrange',
            'x-control-variant': 'horizontal',
            'x-show-input': false,
            max: 200,
            min: 30,
            showInput: true,
        }
    }
};

const NumberInputsDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={schema}
            id='number-inputs-demo'
            data={{}}
        />
    );
};

export default NumberInputsDemo;

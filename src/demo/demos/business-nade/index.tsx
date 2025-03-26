import React from 'react';
import CollectionForm from '../../../library/form-view';
import { employee } from './employee';

const BusinessMadeDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={employee}
            id='advanced-elements-demo'
            data={{}}
        />
    );
};

export default BusinessMadeDemo;

import React from 'react';
import CollectionForm from '../../../library/form-view';
import { employee } from './employee';

const BusinessMadeDemo: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <CollectionForm
                schema={employee}
                id='advanced-elements-demo'
                data={{}}
            />
        </div>
    );
};

export default BusinessMadeDemo;

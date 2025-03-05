import React from 'react';
import CollectionForm from '../../../library/form-view';
import { pagedSchema } from './schema';

const PageDemo: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <CollectionForm
                schema={pagedSchema}
                id='advanced-elements-demo'
                data={{}}
            />
        </div>
    );
};

export default PageDemo;

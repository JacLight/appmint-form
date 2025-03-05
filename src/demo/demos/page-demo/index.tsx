import React from 'react';
import CollectionForm from '../../../library/form-view';
import { pagedSchema } from './schema';

const PageDemo: React.FC = () => {
    return (
        <CollectionForm
            schema={pagedSchema}
            id='advanced-elements-demo'
            data={{}}
        />
    );
};

export default PageDemo;

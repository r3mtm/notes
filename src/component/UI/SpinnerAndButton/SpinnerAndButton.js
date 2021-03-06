import React from 'react';
import { Button } from 'react-bootstrap';

const spinner = (props) => {
    let spinner = null;
    if (props.disabled === true && props.variant !== "secondary") {
        spinner = <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />;
    }
    return (
        <Button
            id="loadMoreBtn"
            variant={props.variant}
            size="md"
            disabled={props.disabled}
            onClick={props.clickedMore}>
            {spinner}{props.message}
        </Button>
    )
};

export default spinner;
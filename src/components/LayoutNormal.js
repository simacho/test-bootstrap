import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexView } from './VertexView'
import * as util from './Util.js';

export const LayoutNormal = (props) => {

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <VertexView {...props} />
                </Col>
                <Col sm={8}>sm=4</Col>
            </Row>
        </Container>
    )
}



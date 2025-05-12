    import React, { useState, useRef } from 'react';
    import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';

    const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);
    const [selectedFont, setSelectedFont] = useState('Arial');
    const [selectedSize, setSelectedSize] = useState('14'); // Tamaño predeterminado en px

    const handleStyle = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
        onChange(editorRef.current.innerHTML);
    };

    // Función para mantener el cursor al final
    const keepCursorAtEnd = () => {
        if (editorRef.current) {
            const range = document.createRange();
            const selection = window.getSelection();
            
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    // Función para manejar el cambio de tamaño de fuente
    const handleFontSizeChange = (increase) => {
        const currentSize = parseInt(selectedSize);
        const newSize = increase ? currentSize + 2 : Math.max(8, currentSize - 2);
        setSelectedSize(newSize.toString());
        handleStyle('fontSize', newSize.toString());
    };

    React.useEffect(() => {
        if (editorRef.current) {
            keepCursorAtEnd();
        }
    }, [value]);

    return (
        <div className="border rounded">
        <ButtonGroup className="p-2 bg-light border-bottom">
            <select 
            className="form-control-sm mx-2"
            value={selectedFont}
            onChange={(e) => {
                setSelectedFont(e.target.value);
                handleStyle('fontName', e.target.value);
            }}
            >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            </select>
            
            <Button
            variant="light"
            onClick={() => handleStyle('bold')}
            title="Negrita"
            >
            <strong>B</strong>
            </Button>
            
            <Button
            variant="light"
            onClick={() => handleStyle('italic')}
            title="Cursiva"
            >
            <em>I</em>
            </Button>
            
            <Button
            variant="light"
            onClick={() => handleStyle('underline')}
            title="Subrayado"
            >
            <u>U</u>
            </Button>

            <Button
                variant="light"
                onClick={() => handleFontSizeChange(true)}
                title="Aumentar tamaño de fuente"
            >
                <span style={{fontSize: "1.2em"}}>T</span><span style={{fontSize: "0.8em"}}>↑</span>
            </Button>

            <Button
                variant="light" 
                onClick={() => handleFontSizeChange(false)}
                title="Disminuir tamaño de fuente"
            >
                <span style={{fontSize: "1.2em"}}>T</span><span style={{fontSize: "0.8em"}}>↓</span>
            </Button>

            <Button
                variant="light"
                onClick={() => {
                    const colorPicker = document.createElement('input');
                    colorPicker.type = 'color';
                    colorPicker.onchange = (e) => handleStyle('foreColor', e.target.value);
                    colorPicker.click();
                }}
                title="Color de texto"
            >
                <span style={{color: '#000'}}>A</span>
                <span style={{fontSize: '0.8em'}}>↓</span>
            </Button>

            <Button
                variant="light"
                onClick={() => {
                    const colorPicker = document.createElement('input');
                    colorPicker.type = 'color';
                    colorPicker.onchange = (e) => handleStyle('hiliteColor', e.target.value);
                    colorPicker.click();
                }}
                title="Color de fondo"
            >
                <span style={{backgroundColor: '#ffff00', padding: '0 2px'}}>A</span>
                <span style={{fontSize: '0.8em'}}>↓</span>
            </Button>
            <Button
                variant="light"
                onClick={() => handleStyle('justifyLeft')}
                title="Alinear a la izquierda"
            >
                <i className="bi bi-text-left"></i>
            </Button>

            <Button
                variant="light"
                onClick={() => handleStyle('justifyCenter')}
                title="Centrar texto"
            >
                <i className="bi bi-text-center"></i>
            </Button>

            <Button
                variant="light"
                onClick={() => handleStyle('justifyRight')}
                title="Alinear a la derecha"
            >
                <i className="bi bi-text-right"></i>
            </Button>

            <Button
                variant="light"
                onClick={() => handleStyle('justifyFull')} 
                title="Justificar texto"
            >
                <i className="bi bi-justify"></i>
            </Button>
        </ButtonGroup>

        <div
            ref={editorRef}
            contentEditable
            className="p-3"
            style={{
                minHeight: '150px',
                outline: 'none',
                fontFamily: selectedFont,
                fontSize: `${selectedSize}px`,
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap'
            }}
            onInput={(e) => {
                // Si el contenido está vacío, establecer el tamaño predeterminado
                if (!e.target.innerHTML || e.target.innerHTML === '<br>') {
                    handleStyle('fontSize', selectedSize);
                }
                onChange(e.target.innerHTML);
                keepCursorAtEnd();
            }}
            onFocus={keepCursorAtEnd}
            dangerouslySetInnerHTML={{ __html: value }}
        />
        </div>
    );
    };

    const ActivityForm = () => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        activityName: '',
        description: ''
    });

    const isFormValid = () => {
        return formData.startDate && 
               formData.endDate && 
               formData.activityName && 
               formData.description;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleCancel = () => {
        setFormData({
            startDate: '',
            endDate: '',
            activityName: '',
            description: ''
        });
    };

    const handleApply = () => {
        if (isFormValid()) {
            console.log('Aplicando cambios:', formData);
        }
    };

    return (
        <div className="container mt-5" style={{ 
            backgroundColor: '#fafafa', 
            padding: '0', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }}>
        <div style={{ 
            backgroundColor: '#9d7fdb', 
            color: 'white', 
            padding: '10px',
            borderRadius: '0',
            fontSize: '1rem',
            fontWeight: '500',
            marginTop: '0',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h2 style={{ 
                margin: '0',
                fontSize: '1rem',
                fontWeight: '500'
            }}>Adicionar tipo de actividad</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                    variant="link" 
                    style={{
                        color: 'white',
                        padding: '0',
                        margin: '0',
                        fontSize: '1.2rem',
                        lineHeight: '1',
                        textDecoration: 'none'
                    }}
                    onClick={() => console.log('Expandir')}
                >
                    <i className="bi bi-arrows-fullscreen"></i>
                </Button>
                <Button 
                    variant="link" 
                    style={{
                        color: 'white',
                        padding: '0',
                        margin: '0',
                        fontSize: '1.2rem',
                        lineHeight: '1',
                        textDecoration: 'none'
                    }}
                    onClick={() => console.log('Cerrar')}
                >
                    <i className="bi bi-x-circle"></i>
                </Button>
            </div>
        </div>
        <Form onSubmit={handleSubmit} style={{ 
            padding: '0 1rem 0rem 1rem',
            flex: '1',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Form.Group className="mb-3">
                <Form.Label>Denominación:</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={formData.activityName}
                    onChange={(e) => setFormData({...formData, activityName: e.target.value})}
                />
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="startDate">
                        <Form.Label>Fecha de Inicio:</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="endDate">
                        <Form.Label>Fecha de Fin:</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            min={formData.startDate}
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-4">
                <Form.Label>Descripción:</Form.Label>
                <RichTextEditor
                    value={formData.description}
                    onChange={(value) => setFormData({...formData, description: value})}
                />
            </Form.Group>

            <div style={{ 
                backgroundColor: '#e8e0f7', 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: '0.5rem',
                marginTop: 'auto',
                marginBottom: '0',
                padding: '0.5rem 1rem 0.5rem',
                width: 'calc(100% + 2rem)',
                marginLeft: '-1rem',
                marginRight: '-1rem'
            }}>
                <Button 
                    variant="light" 
                    onClick={handleCancel}
                    style={{
                        backgroundColor: '#9d7fdb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0',
                        padding: '0.375rem 1.5rem',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#b69de0'}
                    onMouseUp={(e) => e.currentTarget.style.backgroundColor = '#9d7fdb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9d7fdb'}
                >
                    <i className="bi bi-x-lg me-2"></i>Cancelar
                </Button>
                <Button 
                    variant="light" 
                    onClick={handleApply}
                    disabled={!isFormValid()}
                    style={{
                        backgroundColor: isFormValid() ? '#9d7fdb' : '#d3c5e5',
                        color: 'white',
                        border: 'none',
                        cursor: isFormValid() ? 'pointer' : 'not-allowed',
                        borderRadius: '0',
                        padding: '0.375rem 1.5rem',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseDown={(e) => isFormValid() && (e.currentTarget.style.backgroundColor = '#b69de0')}
                    onMouseUp={(e) => isFormValid() && (e.currentTarget.style.backgroundColor = '#9d7fdb')}
                    onMouseLeave={(e) => isFormValid() && (e.currentTarget.style.backgroundColor = '#9d7fdb')}
                >
                    <i className="bi bi-check-lg me-2"></i>Aplicar
                </Button>
                <Button 
                    type="submit"
                    variant="light"
                    style={{
                        backgroundColor: '#9d7fdb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0',
                        padding: '0.375rem 1.5rem',
                        transition: 'background-color 0.2s ease'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#b69de0'}
                    onMouseUp={(e) => e.currentTarget.style.backgroundColor = '#9d7fdb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9d7fdb'}
                >
                    <i className="bi bi-plus-lg me-2"></i>Aceptar
                </Button>
            </div>
        </Form>
        </div>
    );
    };

    export default ActivityForm;
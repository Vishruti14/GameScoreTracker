import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import{Form,FormGroup,Label,Input} from 'reactstrap'
function Update(props) {
    const [modal, setModal] = useState(false);
    const{senddata,item}=props;

    const[formdata,setFormdata]=useState({
        id:item.id,
        gamename:item.gamename,
        score:item.score
    })

    const handleInput=(event)=>{
        const{name,value}=event.target;
        setFormdata({
            ...formdata,
            [name]:value
        })

    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        senddata(formdata);
        toggle();
        setFormdata({
            id:'',
            gamename:'',
            score:''
        })

    }
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="success" onClick={toggle}>
                Update
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update the Details</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="id"
                                hidden
                            >
                                ID
                            </Label>
                            <Input
                                id="id"
                                name="id"
                                placeholder="ID"
                                type="id"
                                required
                                value={formdata.id}
                                onChange={handleInput}
                                disabled
                            />
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Label
                                for="gamename"
                                hidden
                            >
                               Game Name
                            </Label>
                            <Input
                                id="gamename"
                                name="gamename"
                                placeholder="gamename"
                                type="gamename"
                                required
                                value={formdata.gamename}
                                onChange={handleInput}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label
                                for="score"
                                hidden
                            >
                                Score
                            </Label>
                            <Input
                                id="score"
                                name="score"
                                placeholder="Score"
                                type="score"
                                required
                                value={formdata.score}
                                onChange={handleInput}

                            />
                        </FormGroup>
                        {' '}
                        <Button>
                            Submit
                        </Button>
                    </Form>
                </ModalBody>
                
            </Modal>
        </div>
    );
}

export default Update;
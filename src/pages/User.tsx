import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector  } from 'react-redux';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { AppDispatch, RootState } from '../store';
import { postUser, updateUser } from '../store/userSlicer';
import type { User } from '../store/types';



const getCurrentDateTime = (): string => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US'); 
  const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
  return `${formattedDate} ${formattedTime}`;
};

const User: React.FC = () => {
const { id } = useParams<{ id: string }>()

const navigate = useNavigate();
const dispatch: AppDispatch = useDispatch<AppDispatch>();
const user = useSelector((state: RootState) =>
    state.user.data.find(user => user.id === id)
);
const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<User>({
  defaultValues: {
    name: '',
    surname: '',
    mail: '',
    skills: [{ skill: '' }],
  },
});
const { fields, append, remove } = useFieldArray({
  control,
  name: 'skills',
});
useEffect(() => {
  if (user) {
    setValue('name', user.name);
    setValue('surname', user.surname);
    setValue('mail', user.mail);
    setValue('skills', user.skills);
  }
}, [user, setValue]);

const onSubmit: SubmitHandler<User> = async (data) => {
  const newUser: User = {
    id: user?.id || uuidv4(),
    name: data.name,
    surname: data.surname,
    mail: data.mail,
    skills: data.skills,
    registration_date: user?.registration_date || getCurrentDateTime(),
  };

  try {
    if (user) {
      await dispatch(updateUser(newUser)).unwrap();
      alert('User updated successfully');
      navigate(`/`)
    }
    else{
      await dispatch(postUser(newUser)).unwrap();
      alert('User added successfully');
      navigate(`/`)
    }
   
  } catch (error) {
    console.error('Failed to add/update user:', error);
    alert('Failed to add/update user');
  }
};

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-3" >
      <Form.Group className="mb-3" as={Row} controlId="formName">
        <Form.Label column sm={2}>Name</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="First name"
            {...register("name", { required: true, maxLength: 20 })}
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              Name is required and must be less than 20 characters.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" as={Row} controlId="formSurname">
        <Form.Label column sm={2}>Surname</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Last name"
            {...register("surname", { required: true, maxLength: 20 })}
            isInvalid={!!errors.surname}
          />
          {errors.surname && (
            <Form.Control.Feedback type="invalid">
              Surname is required and must be less than 20 characters.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" as={Row} controlId="formEmail">
        <Form.Label column sm={2}>Email</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("mail", { required: true, pattern: /^\S+@\S+$/i })}
            isInvalid={!!errors.mail}
          />
          {errors.mail && (
            <Form.Control.Feedback type="invalid">
              Invalid email address.
            </Form.Control.Feedback>
          )}
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" as={Row} controlId="formSkills">
          <Form.Label column sm={2}>Skills</Form.Label>
          <Col sm={8}>
            {fields.map((field, index) => (
              <Form.Group key={field.id} className="mb-2">
                <Row>
                  <Col sm={8}>
                    <Form.Control
                      type="text"
                      placeholder="Skill"
                      {...register(`skills.${index}.skill` as const, { required: true })}
                      isInvalid={!!errors.skills?.[index]?.skill}
                    />
                    {errors.skills?.[index]?.skill && (
                      <Form.Control.Feedback type="invalid">
                        Skill is required.
                      </Form.Control.Feedback>
                    )}
                  </Col>
                  <Col sm={4} className="d-flex align-items-center">
                    <Button variant="danger" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            ))}
            <Button variant="secondary" onClick={() => append({ skill: '' })}>
              Add Skill
            </Button>
          </Col>
        </Form.Group>      

      <Button type="submit" variant="primary">Submit</Button>
    </Form>
    </>
  )
}

export default User

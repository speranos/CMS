"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create.module.css';
import { useUser } from '../context/UserContext';

export default function CreateCourse() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    schedule: '', 
  });

  const router = useRouter();

  React.useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false };
    const formattedSchedule = now.toLocaleString('en-US', options);
    setCourse((prevCourse) => ({
      ...prevCourse,
      schedule: formattedSchedule,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };
  const { user, setUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    course.instructor = await getCurrentUserId();

    try {
      const response = await fetch('http://localhost:4000/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const result = await response.json();
      console.log('Course created successfully:', result);
      router.push('/');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const getCurrentUserId = async () => {
    const name = await fetch(`http://localhost:4000/username/${user.userId}`);
    const data = await name.json()
    return data;
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Create a New Course</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Course Title:</label>
          <input className={styles.inputtitle}
            type="text"
            id="title"
            name="title"
            required
            value={course.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Course Description:</label>
          <textarea class={styles.textarea}
            id="description"
            name="description"
            required
            value={course.description}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="schedule">Schedule:</label>
          <input className={styles.input}
            type="text"
            id="schedule"
            name="schedule"
            required
            value={course.schedule}
            readOnly
          />
        </div>

        <button type="submit" className={styles.submitButton}>Create Course</button>
      </form>

      <button onClick={() => router.push('/')} className={styles.backButton}>
        Back to Home
      </button>
    </main>
  );
}

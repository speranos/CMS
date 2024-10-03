"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './course.module.css';
import Link from '../../../../node_modules/next/link';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:4000/course/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <main className={styles.main}>
    <h1 className={styles.title}>Welcome to CMS Platform</h1>
      <nav className={styles.navbar}>
        <Link href='/'>
        <button className={styles.navButton}>Home</button>
        </Link>
        <button className={styles.navButton}>Dashboard</button>
        <button className={styles.navButton}>
          {user ? 'Logout' : 'Sign In / Sign Up'}
        </button>
      </nav>
    <div className={styles.courseContainer}>
      <div className={styles.courseTitle}>{course.title}</div>
    <div className={styles.courseDescription}>{course.description}</div>
    <footer className={styles.footer}>
      <div className={styles.courseInstructor}>By: {course.instructor}</div>
      <div className={styles.courseSchedule}>Schedule: {course.schedule}</div>
    </footer>
    </div>
    </main>
  );
};

export default CoursePage;


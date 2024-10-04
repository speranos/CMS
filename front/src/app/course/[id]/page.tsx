"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './course.module.css';
import { useUser } from '../../context/UserContext'

const CoursePage = () => {
  const { id } = useParams();
  const { user, setUser } = useUser();
  const router = useRouter();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to CMS Platform</h1>
      <nav className={styles.navbar}>
        <Link href='/'>
          <button className={styles.navButton}>Home</button>
        </Link>
        <Link href='/Dashboard'>
          <button className={styles.navButton}>Dashboard</button>
        </Link>
        {user ? (
          <button className={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link href='/auth'>
            <button className={styles.navButton}>Sign In / Sign Up</button>
          </Link>
        )}
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

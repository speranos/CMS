"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useUser } from '../context/UserContext';

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 12;

  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    } else {
      fetchUserCourses();
    }
  }, [user]);

  const fetchUserCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:4000/usercourses/${user.userId}?page=${currentPage}&itemsPerPage=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${user.Jwt}`,
          },
        }
      );

      if (!response.ok) {
          setUser(null);
        throw new Error('Failed to load courses');
      }

      const result = await response.json();
      setData(result);
      console.log('Fetched user courses:', result);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    fetchUserCourses();
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
    fetchUserCourses();
  };

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  const handleCreateCourse = () => {
    router.push('/create-course');
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>
      <nav className={styles.navbar}>
        <Link href="/">
          <button className={styles.navButton}>Home</button>
        </Link>
        <Link href="/Dashboard">
          <button className={styles.navButton}>Dashboard</button>
        </Link>
        {user ? (
          <button className={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link href="/auth">
            <button className={styles.navButton}>
              Sign In / Sign Up
            </button>
          </Link>
        )}
      </nav>
      <Link href="/create">
      <button className={styles.createButton}>
       +  Create Course
      </button>
      </Link>
      {loading ? (
        <p className={styles.loading}>Loading your courses...</p>
      ) : error ? (
        <p className={styles.error}>Failed to load courses: {error}</p>
      ) : (
        <>
          <section className={styles.cardContainer}>
            {data.map((course) => (
              <Link href={`/course/${course._id}`} key={course._id} className={styles.cardLink}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>{course.title}</h2>
                  <p className={styles.cardDescription}>
                    {course.description.replace(/\s+/g, ' ').length > 100 
                      ? course.description.replace(/\s+/g, ' ').substring(0, 100) + '...' 
                      : course.description.replace(/\s+/g, ' ')}
                  </p>
                  <p className={styles.cardInstructor}>By: {course.instructor}</p>
                  <p className={styles.cardSchedule}>{course.schedule}</p>
                </div>
              </Link>
            ))}
          </section>
          <div className={styles.pagination}>
            <button
              onClick={prevPage}
              className={styles.pageButton}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={styles.currentPage}>Page {currentPage}</span>
            <button onClick={nextPage} className={styles.pageButton}>
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}

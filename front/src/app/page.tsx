"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { useUser } from './context/UserContext';

export default function CourseComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 12;

  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // const acc = await fetch('http://localhost:4000/acc',
        // {
        //   headers: {
        //     Authorization: `Bearer ${user.Jwt}`,
        //   },
        // });
        // if(!acc.ok)
        //     setUser(null);
        
        const response = await fetch(
          `http://localhost:4000/course?page=${currentPage}&itemsPerPage=${itemsPerPage}`
        );
        const result = await response.json();

        setData(result);
        console.log('Fetched data:', result);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to CMS Platform</h1>
      <nav className={styles.navbar}>
        <button 
          className={styles.navButton} 
          onClick={() => window.location.href = '/'}>
          Home
        </button>
        <Link href='/Dashboard'>
          <button className={styles.navButton}>Dashboard</button>
        </Link>
        {user ? (
          <button className={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link href='/auth'>
            <button className={styles.navButton}>
              Sign In / Sign Up
            </button>
          </Link>
        )}
      </nav>
      {loading ? (
        <p className={styles.loading}>Loading courses...</p>
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

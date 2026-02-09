"use client";
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import React, { useEffect, useState } from 'react';

const ContactDetails = () => {
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch contact data");
                return res.json();
            })
            .then((data) => {
                setContact(data.contacts);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    return (
        <ProtectedRoute>
            <Layout>
                <div className="container mt-5">
                    <h2 className="mb-4">User Contact Details</h2>
                    <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contact?.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data?.email}</td>
                                            <td>{data?.name}</td>
                                            <td>{data?.phone}</td>
                                            <td>{data?.subject}</td>
                                            <td>{data?.message}</td>
                                            <td>{new Date(data?.createdAt).toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    )
}

export default ContactDetails;
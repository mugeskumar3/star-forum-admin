import React from "react";
import { Link } from "react-router-dom";

const RecentlyMembersJoined = () => {
    const members = [
        {
            name: "Kathryn Murphy",
            category: "IT",
            company: "Tech Solutions",
            location: "New York",
            region: "East",
            chapter: "Alpha",
        },
        {
            name: "Guy Hawkins",
            category: "Finance",
            company: "Wealth Corp",
            location: "London",
            region: "UK",
            chapter: "Beta",
        },
        {
            name: "Wade Warren",
            category: "Marketing",
            company: "AdVantage",
            location: "San Francisco",
            region: "West",
            chapter: "Gamma",
        },
        {
            name: "Jenny Wilson",
            category: "Healthcare",
            company: "CarePlus",
            location: "Chicago",
            region: "Midwest",
            chapter: "Delta",
        },
        {
            name: "Jacob Jones",
            category: "Education",
            company: "LearnWell",
            location: "Austin",
            region: "South",
            chapter: "Epsilon",
        },
        {
            name: "Leslie Alexander",
            category: "Real Estate",
            company: "HomeFinders",
            location: "Miami",
            region: "Southeast",
            chapter: "Zeta",
        },
    ];

    return (
        <div className='col-xxl-12'>
            <div className='card h-100'>
                <div className='card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between'>
                    <h6 className='text-lg fw-semibold mb-0'>Recently Members Joined</h6>
                    <Link
                        to='#'
                        className='text-primary-600 hover-text-primary d-flex align-items-center gap-1'
                    >
                        View All
                        <iconify-icon
                            icon='solar:alt-arrow-right-linear'
                            className='icon'
                        />
                    </Link>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive scroll-sm'>
                        <table className='table bordered-table mb-0 rounded-0 border-0'>
                            <thead>
                                <tr>
                                    <th scope='col' className='bg-transparent rounded-0'>Name</th>
                                    <th scope='col' className='bg-transparent rounded-0'>Category</th>
                                    <th scope='col' className='bg-transparent rounded-0'>Company</th>
                                    <th scope='col' className='bg-transparent rounded-0'>Location</th>
                                    <th scope='col' className='bg-transparent rounded-0'>Region</th>
                                    <th scope='col' className='bg-transparent rounded-0'>Chapter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => (
                                    <tr key={index}>
                                        <td>{member.name}</td>
                                        <td>{member.category}</td>
                                        <td>{member.company}</td>
                                        <td>{member.location}</td>
                                        <td>{member.region}</td>
                                        <td>{member.chapter}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentlyMembersJoined;

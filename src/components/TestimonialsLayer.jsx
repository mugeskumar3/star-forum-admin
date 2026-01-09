import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal, Button } from 'react-bootstrap';

const TestimonialsLayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // Mock data
  const testimonials = [
    {
      id: 1,
      memberName: 'Logarajan S P',
      company: 'e-intellisafe & Security Solutions',
      testimonial: 'Excellent platform for business networking. I have received numerous quality referrals through this network. The professional environment and support from fellow members have been outstanding.',
      date: '2025-12-15',
      rating: 5
    },
    {
      id: 2,
      memberName: 'Mathiarasu M',
      company: 'TECHMAXX ENGINEERING',
      testimonial: 'Being part of this community has significantly impacted my business growth. The weekly meetings are productive and the relationships built here are valuable.',
      date: '2025-12-10',
      rating: 5
    },
    {
      id: 3,
      memberName: 'Mano Neelamegam',
      company: 'WUDFE INC',
      testimonial: 'Great experience working with professional members. The networking opportunities are fantastic and I have made valuable business connections.',
      date: '2025-12-05',
      rating: 4
    },
    {
      id: 4,
      memberName: 'Kumar Raj S',
      company: 'Insure Tech Serv',
      testimonial: 'This networking group has been instrumental in expanding my client base. Highly recommend for serious business professionals.',
      date: '2025-11-28',
      rating: 5
    },
    {
      id: 5,
      memberName: 'Priya Sharma',
      company: 'Design Studio Pro',
      testimonial: 'Amazing community of like-minded entrepreneurs. The support and collaboration have helped me grow my business exponentially.',
      date: '2025-11-20',
      rating: 5
    }
  ];

  const handleView = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Icon
        key={index}
        icon={index < rating ? "material-symbols:star" : "material-symbols:star-outline"}
        className={index < rating ? "text-warning" : "text-secondary-light"}
      />
    ));
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-lg fw-semibold mb-0">Testimonials</h6>
      </div>

      <div className="card-body p-24">
        <div className="table-responsive">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Member Name</th>
                <th scope="col">Company</th>
                <th scope="col">Testimonial</th>
                <th scope="col">Rating</th>
                <th scope="col">Date</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}.</td>
                  <td className="fw-semibold">{item.memberName}</td>
                  <td>{item.company}</td>
                  <td>
                    <div style={{ maxWidth: '300px' }}>
                      <p className="mb-0 text-truncate">{item.testimonial}</p>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-0">
                      {renderStars(item.rating)}
                    </div>
                  </td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      onClick={() => handleView(item)}
                      className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                      title="View Full Testimonial"
                    >
                      <Icon icon="mdi:eye-outline" className="menu-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Testimonial Modal */}
      <Modal centered show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-lg fw-semibold">
            <Icon icon="mdi:message-text-outline" className="me-2" />
            Testimonial Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedTestimonial && (
            <div>
              <div className="mb-3">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="avatar-circle bg-neutral-200 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <Icon icon="mdi:account" className="text-neutral-600" style={{ fontSize: '32px' }} />
                  </div>
                  <div>
                    <h5 className="mb-0">{selectedTestimonial.memberName}</h5>
                    <p className="mb-0 text-secondary-light">{selectedTestimonial.company}</p>
                    <div className="d-flex gap-0 mt-1">
                      {renderStars(selectedTestimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-light p-3 rounded">
                <p className="mb-0" style={{ lineHeight: '1.8' }}>{selectedTestimonial.testimonial}</p>
              </div>
              <div className="mt-3 text-end">
                <small className="text-secondary-light">
                  <Icon icon="mdi:calendar" className="me-1" />
                  {new Date(selectedTestimonial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </small>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestimonialsLayer;

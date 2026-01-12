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
        style={{ fontSize: '14px' }}
      />
    ));
  };

  return (
    <div
      style={{
        background: 'var(--bg-color)',
        minHeight: '100vh',
        padding: '1.25rem'
      }}
    >
      {/* Header */}
      <div className="container-fluid mb-2">
        <div className="d-flex align-items-center">
          <div
            style={{
              width: '4px',
              height: '32px',
              background: 'var(--primary-600)',
              borderRadius: '2px',
              marginRight: '0.75rem'
            }}
          />
          <div>
            <p className="fw-bold mb-0" style={{ fontSize: '24px', color: 'var(--text-primary-light)' }}>
              Testimonials Report
            </p>
            <p className="mb-0 small" style={{ color: 'var(--text-secondary-light)' }}>Member testimonials and ratings</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container-fluid">
        <div className="row g-2">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="h-100 shadow-sm"
                style={{ backgroundColor: 'var(--white)', borderRadius: '14px', border: '1px solid var(--border-color)' }}
              >
                <div className="p-2">
                  {/* Header */}
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="mb-0 fw-semibold" style={{ fontSize: '15px', color: 'var(--text-primary-light)' }}>{testimonial.memberName}</h6>
                    <div className="d-flex gap-0">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Company */}
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary-light)' }} className="mb-2">
                    {testimonial.company}
                  </div>

                  {/* Testimonial */}
                  <div
                    className="rounded-3 p-2 mb-2"
                    style={{ background: 'var(--neutral-50)', border: '1px solid var(--border-color)', minHeight: '100px' }}
                  >
                    <p className="mb-0" style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--text-primary-light)' }}>
                      {testimonial.testimonial.substring(0, 120)}
                      {testimonial.testimonial.length > 120 ? '...' : ''}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="d-flex align-items-center justify-content-between">
                    <small style={{ fontSize: '10px', color: 'var(--text-secondary-light)' }}>
                      <Icon icon="mdi:calendar" className="me-1" />
                      {new Date(testimonial.date).toLocaleDateString()}
                    </small>
                    <button
                      type="button"
                      onClick={() => handleView(testimonial)}
                      className="btn btn-sm"
                      style={{
                        background: 'var(--primary-600)',
                        color: '#fff',
                        padding: '4px 12px',
                        fontSize: '11px',
                        borderRadius: '6px'
                      }}
                      title="View Full Testimonial"
                    >
                      <Icon icon="mdi:eye-outline" className="me-1" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

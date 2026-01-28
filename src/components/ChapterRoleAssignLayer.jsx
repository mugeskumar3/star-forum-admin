import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";
import MemberApi from "../Api/MemberApi";
import RoleApi from "../Api/RoleApi";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const ChapterRoleAssignLayer = () => {
  const { id } = useParams();
  const [roleOptions, setRoleOptions] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [assignedRoles, setAssignedRoles] = useState([
    { id: 1, role: "President", member: "John Doe", memberId: "MEM001" },
    { id: 2, role: "Secretary", member: "Jane Smith", memberId: "MEM002" },
  ]);
  const [formData, setFormData] = useState({
    role: null,
    member: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles();
    fetchMembers();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await RoleApi.getRoles();
      if (res.status) {
        setRoleOptions(
          res.response.data.map((r) => ({ value: r._id, label: r.name })),
        );
      }
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await MemberApi.getMembers({ chapterId: id });
      if (res.status) {
        setMemberOptions(
          res.response.data.map((m) => ({
            value: m._id,
            label: `${m.fullName} - ${m.membershipId}`,
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching members", error);
    }
  };

  const handleChange = (selectedOption, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selectedOption }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.member) newErrors.member = "Member is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditMode) {
      setAssignedRoles((prev) =>
        prev.map((item) =>
          item.id === editId
            ? {
                ...item,
                role: formData.role.label,
                member: formData.member.label.split(" - ")[0], // Just name for display
                memberId: "MEM_UPDATED", // Dummy ID
              }
            : item,
        ),
      );
      toast.success("Role assignment updated successfully");
      setIsEditMode(false);
      setEditId(null);
    } else {
      const newRole = {
        id: Date.now(),
        role: formData.role.label,
        member: formData.member.label.split(" - ")[0],
        memberId: "MEM_NEW",
      };
      setAssignedRoles((prev) => [...prev, newRole]);
      toast.success("Role assigned successfully");
    }
    setFormData({ role: null, member: null });
  };

  const handleEdit = (item) => {
    // Find options to pre-select (dummy matching by label)
    const roleOpt = roleOptions.find((r) => r.label === item.role);
    const memberName = item.member;
    const memberOpt = memberOptions.find((m) => m.label.includes(memberName));

    setFormData({
      role: roleOpt || { value: "dummy", label: item.role },
      member: memberOpt || { value: "dummy", label: item.member },
    });
    setIsEditMode(true);
    setEditId(item.id);
  };

  const handleDeleteClick = (id) => {
    setRoleToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      setAssignedRoles((prev) =>
        prev.filter((item) => item.id !== roleToDelete),
      );
      toast.success("Role assignment deleted successfully");
      setShowDeleteModal(false);
      setRoleToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRoleToDelete(null);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24">
        <h6 className="text-primary-600 pb-2 mb-0">Assign Chapter Roles</h6>
      </div>
      <div className="card-body p-24">
        <form onSubmit={handleSubmit} className="mb-24">
          <div className="row gy-3">
            <div className="col-md-5">
              <label className="form-label fw-semibold">Role</label>
              <Select
                name="role"
                options={roleOptions}
                value={formData.role}
                onChange={handleChange}
                placeholder="Select Role"
              />
              {errors.role && (
                <small className="text-danger">{errors.role}</small>
              )}
            </div>
            <div className="col-md-5">
              <label className="form-label fw-semibold">Member</label>
              <Select
                name="member"
                options={memberOptions}
                value={formData.member}
                onChange={handleChange}
                placeholder="Select Member"
              />
              {errors.member && (
                <small className="text-danger">{errors.member}</small>
              )}
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-primary w-100 radius-8"
                style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>

        <div className="table-responsive rounded-8 border border-neutral-200">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col" style={{ color: "black" }}>
                  S.No
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Role
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Member
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {assignedRoles.length > 0 ? (
                assignedRoles.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.role}</td>
                    <td>{item.member}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="bg-danger-focus text-danger-600 bg-hover-danger-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle border-0"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No roles assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Body className="text-center p-5">
          <div className="d-flex justify-content-center mb-3">
            <div className="bg-danger-focus rounded-circle d-flex justify-content-center align-items-center w-64-px h-64-px">
              <Icon
                icon="mingcute:delete-2-line"
                className="text-danger-600 text-xxl"
              />
            </div>
          </div>
          <h5 className="mb-3">Are you sure?</h5>
          <p className="text-secondary-light mb-4">
            Do you want to delete this role assignment? This action cannot be
            undone.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="outline-secondary"
              className="px-32"
              onClick={handleCloseDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="px-32"
              onClick={confirmDelete}
              style={{ backgroundColor: "#C4161C", borderColor: "#C4161C" }}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChapterRoleAssignLayer;

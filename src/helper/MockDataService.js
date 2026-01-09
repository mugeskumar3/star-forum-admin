import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
    ORGANISATIONS: 'star_organisations',
    BADGES: 'star_badges',
    ASSIGNED_BADGES: 'star_assigned_badges'
};

const getFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const MockDataService = {
    // --- Organisation ---
    getOrganisations: () => getFromStorage(STORAGE_KEYS.ORGANISATIONS),

    getOrganisationById: (id) => {
        const list = getFromStorage(STORAGE_KEYS.ORGANISATIONS);
        return list.find(item => item.id === id);
    },

    saveOrganisation: (org) => {
        const list = getFromStorage(STORAGE_KEYS.ORGANISATIONS);
        if (org.id) {
            // Update
            const index = list.findIndex(item => item.id === org.id);
            if (index !== -1) {
                list[index] = org;
                saveToStorage(STORAGE_KEYS.ORGANISATIONS, list);
            }
        } else {
            // Create
            org.id = uuidv4();
            list.push(org);
            saveToStorage(STORAGE_KEYS.ORGANISATIONS, list);
        }
    },

    deleteOrganisation: (id) => {
        let list = getFromStorage(STORAGE_KEYS.ORGANISATIONS);
        list = list.filter(item => item.id !== id);
        saveToStorage(STORAGE_KEYS.ORGANISATIONS, list);
    },

    // --- Badges ---
    getBadges: () => getFromStorage(STORAGE_KEYS.BADGES),

    getBadgeById: (id) => {
        const list = getFromStorage(STORAGE_KEYS.BADGES);
        return list.find(item => item.id === id);
    },

    saveBadge: (badge) => {
        const list = getFromStorage(STORAGE_KEYS.BADGES);
        if (badge.id) {
            const index = list.findIndex(item => item.id === badge.id);
            if (index !== -1) {
                list[index] = badge;
                saveToStorage(STORAGE_KEYS.BADGES, list);
            }
        } else {
            badge.id = uuidv4();
            list.push(badge);
            saveToStorage(STORAGE_KEYS.BADGES, list);
        }
    },

    deleteBadge: (id) => {
        let list = getFromStorage(STORAGE_KEYS.BADGES);
        list = list.filter(item => item.id !== id);
        saveToStorage(STORAGE_KEYS.BADGES, list);
    },

    // --- Assigned Badges (Simple Store) ---
    getAssignedBadges: () => getFromStorage(STORAGE_KEYS.ASSIGNED_BADGES),

    assignBadge: (assignment) => {
        const list = getFromStorage(STORAGE_KEYS.ASSIGNED_BADGES);
        assignment.id = uuidv4();
        list.push(assignment);
        saveToStorage(STORAGE_KEYS.ASSIGNED_BADGES, list);
    }
};

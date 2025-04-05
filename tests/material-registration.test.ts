import { describe, it, expect, beforeEach } from 'vitest';

// Mock implementation for testing Clarity contracts
// This is a simplified testing approach without using the actual Clarity SDK

// Mock state
const state = {
  lastMaterialId: 0,
  materials: new Map(),
  principals: {
    deployer: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    user1: 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5',
    user2: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
  },
  currentSender: ''
};

// Mock contract functions
const materialRegistration = {
  registerMaterial: (title, description, subject, gradeLevel) => {
    const sender = state.currentSender;
    const newId = state.lastMaterialId + 1;
    state.lastMaterialId = newId;
    
    state.materials.set(newId, {
      title,
      description,
      subject,
      gradeLevel,
      owner: sender,
      createdAt: 100, // Mock block height
      available: true
    });
    
    return { result: { value: newId } };
  },
  
  getMaterial: (materialId) => {
    const material = state.materials.get(materialId);
    return material ? { result: { value: material } } : { result: { value: null } };
  },
  
  getMaterialCount: () => {
    return { result: { value: state.lastMaterialId } };
  },
  
  updateMaterialAvailability: (materialId, available) => {
    const sender = state.currentSender;
    const material = state.materials.get(materialId);
    
    if (!material) {
      return { result: { error: 1 } };
    }
    
    if (material.owner !== sender) {
      return { result: { error: 2 } };
    }
    
    material.available = available;
    state.materials.set(materialId, material);
    
    return { result: { value: true } };
  }
};

describe('Material Registration Contract', () => {
  beforeEach(() => {
    // Reset state before each test
    state.lastMaterialId = 0;
    state.materials = new Map();
    state.currentSender = state.principals.deployer;
  });
  
  it('should register a new material', () => {
    state.currentSender = state.principals.user1;
    
    const result = materialRegistration.registerMaterial(
        'Math Workbook',
        'Comprehensive workbook for algebra',
        'Mathematics',
        'High School'
    );
    
    expect(result.result.value).toBe(1);
    expect(state.lastMaterialId).toBe(1);
    
    const material = state.materials.get(1);
    expect(material).toBeDefined();
    expect(material.title).toBe('Math Workbook');
    expect(material.owner).toBe(state.principals.user1);
    expect(material.available).toBe(true);
  });
  
  it('should get material by id', () => {
    state.currentSender = state.principals.user1;
    
    materialRegistration.registerMaterial(
        'Science Lab Manual',
        'Experiments for biology class',
        'Science',
        'Middle School'
    );
    
    const result = materialRegistration.getMaterial(1);
    expect(result.result.value).toBeDefined();
    expect(result.result.value.title).toBe('Science Lab Manual');
    expect(result.result.value.subject).toBe('Science');
  });
  
  it('should update material availability', () => {
    state.currentSender = state.principals.user1;
    
    materialRegistration.registerMaterial(
        'History Timeline',
        'Visual timeline of world events',
        'History',
        'Elementary'
    );
    
    // Try to update as different user (should fail)
    state.currentSender = state.principals.user2;
    let result = materialRegistration.updateMaterialAvailability(1, false);
    expect(result.result.error).toBe(2);
    
    // Update as owner (should succeed)
    state.currentSender = state.principals.user1;
    result = materialRegistration.updateMaterialAvailability(1, false);
    expect(result.result.value).toBe(true);
    
    const material = state.materials.get(1);
    expect(material.available).toBe(false);
  });
  
  it('should return the correct material count', () => {
    state.currentSender = state.principals.user1;
    
    expect(materialRegistration.getMaterialCount().result.value).toBe(0);
    
    materialRegistration.registerMaterial('Resource 1', 'Description 1', 'Subject 1', 'Grade 1');
    expect(materialRegistration.getMaterialCount().result.value).toBe(1);
    
    materialRegistration.registerMaterial('Resource 2', 'Description 2', 'Subject 2', 'Grade 2');
    expect(materialRegistration.getMaterialCount().result.value).toBe(2);
  });
});

/**
 * Todo List Application
 * A fully functional, state-driven task management app with localStorage persistence
 * Features: CRUD operations, filtering, editing, and automatic data persistence
 */

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

class TodoApp {
    constructor() {
        // Application state
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;

        // DOM element references
        this.elements = {
            taskInput: document.getElementById('taskInput'),
            addBtn: document.getElementById('addBtn'),
            taskList: document.getElementById('taskList'),
            emptyState: document.getElementById('emptyState'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            totalTasks: document.getElementById('totalTasks'),
            completedCount: document.getElementById('completedCount'),
            remainingCount: document.getElementById('remainingCount'),
            clearCompleted: document.getElementById('clearCompleted'),
            clearAll: document.getElementById('clearAll'),
        };

        // Local storage key
        this.STORAGE_KEY = 'todoAppTasks';

        // Initialize app
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.loadFromStorage();
        this.attachEventListeners();
        this.render();
    }

    // ========================================================================
    // LOCAL STORAGE OPERATIONS
    // ========================================================================

    /**
     * Load tasks from localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.tasks = stored ? JSON.parse(stored) : [];
            console.log('✅ Tasks loaded from storage:', this.tasks.length);
        } catch (error) {
            console.error('❌ Error loading from storage:', error);
            this.tasks = [];
        }
    }

    /**
     * Save tasks to localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
            console.log('💾 Tasks saved to storage');
        } catch (error) {
            console.error('❌ Error saving to storage:', error);
            alert('Failed to save tasks. Storage might be full.');
        }
    }

    // ========================================================================
    // CRUD OPERATIONS
    // ========================================================================

    /**
     * Create a new task
     * @param {string} text - The task description
     * @returns {boolean} - Success status
     */
    createTask(text) {
        const trimmedText = text.trim();

        // Validation
        if (!trimmedText) {
            this.showNotification('Please enter a task description', 'warning');
            return false;
        }

        if (trimmedText.length > 200) {
            this.showNotification('Task description is too long (max 200 characters)', 'warning');
            return false;
        }

        // Create task object
        const task = {
            id: Date.now(),
            text: trimmedText,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Add to state and persist
        this.tasks.unshift(task);
        this.saveToStorage();
        this.render();
        this.clearInput();

        console.log('✨ Task created:', task);
        return true;
    }

    /**
     * Read/Get a task by ID
     * @param {number} id - The task ID
     * @returns {object|null} - The task object or null
     */
    getTask(id) {
        return this.tasks.find((task) => task.id === id) || null;
    }

    /**
     * Update a task
     * @param {number} id - The task ID
     * @param {object} updates - Fields to update
     * @returns {boolean} - Success status
     */
    updateTask(id, updates) {
        const task = this.getTask(id);

        if (!task) {
            console.warn('Task not found:', id);
            return false;
        }

        // Apply updates
        Object.assign(task, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });

        this.saveToStorage();
        this.render();

        console.log('✏️ Task updated:', task);
        return true;
    }

    /**
     * Delete a task by ID
     * @param {number} id - The task ID
     * @returns {boolean} - Success status
     */
    deleteTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter((task) => task.id !== id);

        if (this.tasks.length < initialLength) {
            this.saveToStorage();
            this.render();
            console.log('🗑️ Task deleted:', id);
            return true;
        }

        console.warn('Task not found:', id);
        return false;
    }

    /**
     * Toggle task completion status
     * @param {number} id - The task ID
     */
    toggleTask(id) {
        const task = this.getTask(id);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date().toISOString();
            this.saveToStorage();
            this.render();
        }
    }

    // ========================================================================
    // FILTERING OPERATIONS
    // ========================================================================

    /**
     * Get filtered tasks based on current filter
     * @returns {array} - Filtered task array
     */
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter((task) => !task.completed);
            case 'completed':
                return this.tasks.filter((task) => task.completed);
            case 'all':
            default:
                return this.tasks;
        }
    }

    /**
     * Get task statistics
     * @returns {object} - Stats object
     */
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter((task) => task.completed).length;
        const active = total - completed;

        return { total, completed, active };
    }

    /**
     * Clear all completed tasks
     */
    clearCompleted() {
        const completedCount = this.tasks.filter((task) => task.completed).length;

        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear', 'info');
            return;
        }

        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter((task) => !task.completed);
            this.saveToStorage();
            this.render();
            this.showNotification('Completed tasks cleared', 'success');
        }
    }

    /**
     * Clear all tasks
     */
    clearAll() {
        if (this.tasks.length === 0) {
            this.showNotification('No tasks to clear', 'info');
            return;
        }

        if (confirm(`Delete all ${this.tasks.length} task(s)? This cannot be undone.`)) {
            this.tasks = [];
            this.saveToStorage();
            this.render();
            this.showNotification('All tasks cleared', 'success');
        }
    }

    // ========================================================================
    // EVENT HANDLING
    // ========================================================================

    /**
     * Attach event listeners to DOM elements
     */
    attachEventListeners() {
        // Add task on button click
        this.elements.addBtn.addEventListener('click', () => this.handleAddTask());

        // Add task on Enter key
        this.elements.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddTask();
            }
        });

        // Filter buttons
        this.elements.filterBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Clear buttons
        this.elements.clearCompleted.addEventListener('click', () =>
            this.clearCompleted()
        );
        this.elements.clearAll.addEventListener('click', () => this.clearAll());

        // Delegated event listeners for task items
        this.elements.taskList.addEventListener('click', (e) =>
            this.handleTaskListClick(e)
        );

        console.log('✅ Event listeners attached');
    }

    /**
     * Handle add task action
     */
    handleAddTask() {
        const text = this.elements.taskInput.value;
        this.createTask(text);
    }

    /**
     * Handle filter change
     * @param {Event} e - The click event
     */
    handleFilterChange(e) {
        const filter = e.currentTarget.dataset.filter;
        this.currentFilter = filter;

        // Update active button
        this.elements.filterBtns.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
        console.log('🔍 Filter changed to:', filter);
    }

    /**
     * Handle task list click events (delegated)
     * @param {Event} e - The click event
     */
    handleTaskListClick(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = parseInt(taskItem.dataset.id, 10);

        if (e.target.classList.contains('task-checkbox')) {
            this.toggleTask(taskId);
        } else if (e.target.classList.contains('edit-btn')) {
            this.startEditing(taskId, taskItem);
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('Delete this task?')) {
                this.deleteTask(taskId);
            }
        } else if (e.target.classList.contains('save-btn')) {
            this.saveEdit(taskId, taskItem);
        } else if (e.target.classList.contains('cancel-btn')) {
            this.cancelEdit(taskItem);
        }
    }

    /**
     * Start editing a task
     * @param {number} taskId - The task ID
     * @param {HTMLElement} taskItem - The task DOM element
     */
    startEditing(taskId, taskItem) {
        // Cancel previous edit if any
        if (this.editingId !== null && this.editingId !== taskId) {
            const otherItem = this.elements.taskList.querySelector(
                `[data-id="${this.editingId}"]`
            );
            if (otherItem) {
                this.cancelEdit(otherItem);
            }
        }

        const task = this.getTask(taskId);
        if (!task) return;

        this.editingId = taskId;
        taskItem.classList.add('edit-mode');

        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;

        // Replace text with input
        const textDisplay = taskItem.querySelector('.task-text-display');
        textDisplay.replaceWith(editInput);

        // Update buttons
        const actions = taskItem.querySelector('.task-actions');
        const buttons = actions.querySelectorAll('.task-btn');
        buttons.forEach((btn) => {
            btn.classList.add('hidden');
        });

        // Add save and cancel buttons
        const saveBtn = document.createElement('button');
        saveBtn.className = 'task-btn save-btn';
        saveBtn.innerHTML = '✓';
        saveBtn.title = 'Save';

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'task-btn cancel-btn';
        cancelBtn.innerHTML = '✕';
        cancelBtn.title = 'Cancel';

        actions.appendChild(saveBtn);
        actions.appendChild(cancelBtn);

        editInput.focus();
        editInput.select();

        // Handle Enter to save
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveEdit(taskId, taskItem);
            } else if (e.key === 'Escape') {
                this.cancelEdit(taskItem);
            }
        });
    }

    /**
     * Save task edit
     * @param {number} taskId - The task ID
     * @param {HTMLElement} taskItem - The task DOM element
     */
    saveEdit(taskId, taskItem) {
        const editInput = taskItem.querySelector('.edit-input');
        const newText = editInput.value.trim();

        if (!newText) {
            this.showNotification('Task cannot be empty', 'warning');
            editInput.focus();
            return;
        }

        if (newText.length > 200) {
            this.showNotification('Task description is too long (max 200 characters)', 'warning');
            editInput.focus();
            return;
        }

        this.updateTask(taskId, { text: newText });
        this.editingId = null;
    }

    /**
     * Cancel task edit
     * @param {HTMLElement} taskItem - The task DOM element
     */
    cancelEdit(taskItem) {
        const taskId = parseInt(taskItem.dataset.id, 10);
        this.editingId = null;

        // Restore UI
        taskItem.classList.remove('edit-mode');
        this.render();
    }

    /**
     * Clear input field
     */
    clearInput() {
        this.elements.taskInput.value = '';
        this.elements.taskInput.focus();
    }

    /**
     * Show notification to user
     * @param {string} message - The notification message
     * @param {string} type - The notification type (success, warning, error, info)
     */
    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}]`, message);
        // Could be extended to show visual notifications in UI
    }

    // ========================================================================
    // RENDERING
    // ========================================================================

    /**
     * Main render function - updates the entire UI
     */
    render() {
        this.renderTasks();
        this.updateStats();
        this.updateFilterCounts();
        this.updateEmptyState();
        this.updateButtonStates();
    }

    /**
     * Render task list items
     */
    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        this.elements.taskList.innerHTML = '';

        filteredTasks.forEach((task) => {
            const taskElement = this.createTaskElement(task);
            this.elements.taskList.appendChild(taskElement);
        });
    }

    /**
     * Create a task DOM element
     * @param {object} task - The task object
     * @returns {HTMLElement} - The task element
     */
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? 'checked' : ''}
                aria-label="Toggle task completion"
            />
            <span class="task-text task-text-display">${this.escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="task-btn edit-btn" title="Edit task" aria-label="Edit">
                    ✎
                </button>
                <button class="task-btn delete-btn" title="Delete task" aria-label="Delete">
                    🗑️
                </button>
            </div>
        `;

        return li;
    }

    /**
     * Update task statistics display
     */
    updateStats() {
        const stats = this.getStats();
        this.elements.totalTasks.textContent = stats.total;
        this.elements.completedCount.textContent = stats.completed;
        this.elements.remainingCount.textContent = stats.active;
    }

    /**
     * Update filter button counts
     */
    updateFilterCounts() {
        const stats = this.getStats();

        this.elements.filterBtns.forEach((btn) => {
            const filter = btn.dataset.filter;
            const count = btn.querySelector('.filter-count');

            switch (filter) {
                case 'all':
                    count.textContent = stats.total;
                    break;
                case 'active':
                    count.textContent = stats.active;
                    break;
                case 'completed':
                    count.textContent = stats.completed;
                    break;
            }
        });
    }

    /**
     * Update empty state visibility
     */
    updateEmptyState() {
        const filteredTasks = this.getFilteredTasks();
        const isEmpty = filteredTasks.length === 0;

        this.elements.emptyState.style.display = isEmpty ? 'flex' : 'none';
        this.elements.taskList.style.display = isEmpty ? 'none' : 'flex';
    }

    /**
     * Update button states based on app state
     */
    updateButtonStates() {
        const hasCompleted = this.tasks.some((task) => task.completed);
        this.elements.clearCompleted.disabled = !hasCompleted;
        this.elements.clearAll.disabled = this.tasks.length === 0;
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
    console.log('🚀 Todo App initialized');
});

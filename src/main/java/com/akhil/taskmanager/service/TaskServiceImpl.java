package com.akhil.taskmanager.service;

import com.akhil.taskmanager.model.Task;
import com.akhil.taskmanager.model.User;
import com.akhil.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task, User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasksByUser(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    @Override
    public List<Task> getTasksByStatus(Long userId, boolean completed) {
        return taskRepository.findByUserIdAndCompleted(userId, completed);
    }

    @Override
    public Optional<Task> getTaskById(Long taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public Task updateTask(Long taskId, Task taskDetails) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setCompleted(taskDetails.isCompleted());

        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
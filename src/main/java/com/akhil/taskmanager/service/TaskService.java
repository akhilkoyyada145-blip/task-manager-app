package com.akhil.taskmanager.service;

import com.akhil.taskmanager.model.Task;
import com.akhil.taskmanager.model.User;
import java.util.List;
import java.util.Optional;

public interface TaskService {

    Task createTask(Task task, User user);

    List<Task> getAllTasksByUser(Long userId);

    List<Task> getTasksByStatus(Long userId, boolean completed);

    Optional<Task> getTaskById(Long taskId);

    Task updateTask(Long taskId, Task taskDetails);

    void deleteTask(Long taskId);
}
package com.example.fullstack.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "tasks")  // ✅ NEW table name
@Data
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int duration;
    private boolean completed;
}
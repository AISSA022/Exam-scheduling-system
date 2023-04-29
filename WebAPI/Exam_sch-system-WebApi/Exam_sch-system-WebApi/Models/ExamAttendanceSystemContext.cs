﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Exam_sch_system_WebApi.Models;

public partial class ExamAttendanceSystemContext : DbContext
{
    public ExamAttendanceSystemContext()
    {
    }

    public ExamAttendanceSystemContext(DbContextOptions<ExamAttendanceSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(e => e.RoleId).ValueGeneratedNever();
            entity.Property(e => e.Role1)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("Role");
            entity.Property(e => e.UserId).HasColumnName("userId");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.HasIndex(e => e.Email, "UK_Email_User").IsUnique();

            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password).IsUnicode(false);
            entity.Property(e => e.RefreshToken).IsUnicode(false);
            entity.Property(e => e.RefreshTokenTime).HasColumnType("datetime");
            entity.Property(e => e.ResetPasswordExpiry).HasColumnType("datetime");
            entity.Property(e => e.ResetPasswordToken).IsUnicode(false);
            entity.Property(e => e.Token)
                .IsUnicode(false)
                .HasColumnName("token");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
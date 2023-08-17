using System;
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

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Day> Days { get; set; }

    public virtual DbSet<Period> Periods { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<RoomDetail> RoomDetails { get; set; }

    public virtual DbSet<RoomPeriod> RoomPeriods { get; set; }

    public virtual DbSet<Semester> Semesters { get; set; }

    public virtual DbSet<SemesterCourse> SemesterCourses { get; set; }

    public virtual DbSet<StudentSemester> StudentSemesters { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.ToTable("Course");

            entity.HasIndex(e => e.CourseCode, "UC_Courses_CourseCode").IsUnique();

            entity.Property(e => e.CourseCode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CourseName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Instructor)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Section)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Day>(entity =>
        {
            entity.Property(e => e.DayTime).HasColumnType("date");
        });

        modelBuilder.Entity<Period>(entity =>
        {
            entity.ToTable("Period");

            entity.Property(e => e.PeriodName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TimeFrom).HasColumnType("text");
            entity.Property(e => e.TimeTo).HasColumnType("text");

            entity.HasOne(d => d.Day).WithMany(p => p.Periods)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Period_Days");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.ToTable("Permission");

            entity.Property(e => e.GroupName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.ToTable("Report");

            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.Type).IsUnicode(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.ToTable("RolePermission");

            entity.HasOne(d => d.Permission).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.PermissionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolePermission_Permission1");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RolePermission_Roles1");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.ToTable("Room");

            entity.Property(e => e.Building).HasColumnType("text");
            entity.Property(e => e.RoomDetailsId).HasColumnName("RoomDetailsID");
            entity.Property(e => e.RoomName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.RoomDetails).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.RoomDetailsId)
                .HasConstraintName("FK_Room_RoomDetails");
        });

        modelBuilder.Entity<RoomDetail>(entity =>
        {
            entity.HasKey(e => e.RoomDetailsId);

            entity.Property(e => e.RoomDetailsId).HasColumnName("RoomDetailsID");
            entity.Property(e => e.ColumnName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.RoomId).HasColumnName("RoomID");
            entity.Property(e => e.RowCapacity).HasColumnName("rowCapacity");
        });

        modelBuilder.Entity<RoomPeriod>(entity =>
        {
            entity.HasOne(d => d.Period).WithMany(p => p.RoomPeriods)
                .HasForeignKey(d => d.PeriodId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoomPeriods_Period");

            entity.HasOne(d => d.Room).WithMany(p => p.RoomPeriods)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RoomPeriods_Room");
        });

        modelBuilder.Entity<Semester>(entity =>
        {
            entity.Property(e => e.SemesterName).IsUnicode(false);
        });

        modelBuilder.Entity<SemesterCourse>(entity =>
        {
            entity.HasKey(e => e.SemesterCourseId).HasName("PK_SemesterCourse'");

            entity.ToTable("SemesterCourse");

            entity.HasOne(d => d.Course).WithMany(p => p.SemesterCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SemesterCourse_Course");

            entity.HasOne(d => d.RoomPeriod).WithMany(p => p.SemesterCourses)
                .HasForeignKey(d => d.RoomPeriodId)
                .HasConstraintName("FK_SemesterCourse_RoomPeriods");

            entity.HasOne(d => d.Semester).WithMany(p => p.SemesterCourses)
                .HasForeignKey(d => d.SemesterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SemesterCourse_Semesters");
        });

        modelBuilder.Entity<StudentSemester>(entity =>
        {
            entity.ToTable("StudentSemester");

            entity.HasOne(d => d.SemesterCourse).WithMany(p => p.StudentSemesters)
                .HasForeignKey(d => d.SemesterCourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentSemester_SemesterCourse");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentSemesters)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentSemester_User");
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
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password).IsUnicode(false);
            entity.Property(e => e.RefreshToken).IsUnicode(false);
            entity.Property(e => e.RefreshTokenTime).HasColumnType("datetime");
            entity.Property(e => e.ResetPasswordExpiry).HasColumnType("datetime");
            entity.Property(e => e.ResetPasswordToken).IsUnicode(false);
            entity.Property(e => e.RoleId).HasDefaultValueSql("((1))");
            entity.Property(e => e.Token)
                .IsUnicode(false)
                .HasColumnName("token");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_User_Roles");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

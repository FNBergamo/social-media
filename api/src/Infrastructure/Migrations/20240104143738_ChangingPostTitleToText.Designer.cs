﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(SocialMediaContext))]
    [Migration("20240104143738_ChangingPostTitleToText")]
    partial class ChangingPostTitleToText
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entitties.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreteadAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Likes")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("ModifiedAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Domain.Entitties.CommentInteraction", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("CommentId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreteadAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ModifiedAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("UserId", "CommentId");

                    b.HasIndex("CommentId");

                    b.ToTable("CommentInteractions");
                });

            modelBuilder.Entity("Domain.Entitties.Friendship", b =>
                {
                    b.Property<Guid>("SenderUserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("RequestedUserId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreteadAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ModifiedAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("SenderUserId", "RequestedUserId");

                    b.HasIndex("RequestedUserId");

                    b.ToTable("Friendships");
                });

            modelBuilder.Entity("Domain.Entitties.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreteadAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsHidden")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPrivate")
                        .HasColumnType("boolean");

                    b.Property<int>("Likes")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("ModifiedAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<int?>("UserInteraction")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Domain.Entitties.PostInteraction", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreteadAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ModifiedAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("UserId", "PostId");

                    b.HasIndex("PostId");

                    b.ToTable("PostInteractions");
                });

            modelBuilder.Entity("Domain.Entitties.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("CreteadAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedAtUtc")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProfilePicture")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entitties.Comment", b =>
                {
                    b.HasOne("Domain.Entitties.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entitties.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entitties.CommentInteraction", b =>
                {
                    b.HasOne("Domain.Entitties.Comment", "Comment")
                        .WithMany()
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entitties.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Comment");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entitties.Friendship", b =>
                {
                    b.HasOne("Domain.Entitties.User", "RequestedUser")
                        .WithMany()
                        .HasForeignKey("RequestedUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain.Entitties.User", "SenderUser")
                        .WithMany()
                        .HasForeignKey("SenderUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("RequestedUser");

                    b.Navigation("SenderUser");
                });

            modelBuilder.Entity("Domain.Entitties.Post", b =>
                {
                    b.HasOne("Domain.Entitties.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entitties.PostInteraction", b =>
                {
                    b.HasOne("Domain.Entitties.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entitties.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}

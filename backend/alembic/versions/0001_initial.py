from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table("users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("email", sa.String(255), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("role", sa.String(20), nullable=False, server_default="user"),
        sa.Column("phone", sa.String(30)),
        sa.Column("state", sa.String(100)),
        sa.Column("district", sa.String(100)),
        sa.Column("taluka", sa.String(100)),
        sa.Column("village", sa.String(100)),
        sa.Column("business_category", sa.String(100)),
        sa.Column("preferred_language", sa.String(10), nullable=False, server_default="en"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False))
    op.create_table("schemes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("category", sa.String(100), nullable=False),
        sa.Column("state", sa.String(100), server_default="India"),
        sa.Column("eligibility", sa.Text(), nullable=False),
        sa.Column("benefits", sa.Text(), nullable=False),
        sa.Column("documents", sa.Text(), nullable=False),
        sa.Column("application_steps", sa.Text(), nullable=False),
        sa.Column("official_url", sa.String(500)),
        sa.Column("source_name", sa.String(200)),
        sa.Column("verification_status", sa.String(30), nullable=False, server_default="demo"),
        sa.Column("last_verified_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False))
    op.create_table("saved_schemes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("scheme_id", sa.Integer(), sa.ForeignKey("schemes.id", ondelete="CASCADE"), nullable=False),
        sa.UniqueConstraint("user_id", "scheme_id", name="uq_saved_user_scheme"))
    op.create_table("lessons",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("category", sa.String(100), nullable=False),
        sa.Column("language", sa.String(10), nullable=False, server_default="en"),
        sa.Column("level", sa.String(30), nullable=False, server_default="beginner"),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("published", sa.Boolean(), nullable=False, server_default=sa.true()))
    op.create_table("lesson_progress",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("lesson_id", sa.Integer(), sa.ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.UniqueConstraint("user_id", "lesson_id", name="uq_progress_user_lesson"))
    op.create_table("posts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("category", sa.String(80), nullable=False, server_default="General"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False))
    op.create_table("comments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("post_id", sa.Integer(), sa.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False))
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_schemes_category", "schemes", ["category"])
    op.create_index("ix_posts_created_at", "posts", ["created_at"])

def downgrade():
    op.drop_table("comments")
    op.drop_table("posts")
    op.drop_table("lesson_progress")
    op.drop_table("lessons")
    op.drop_table("saved_schemes")
    op.drop_table("schemes")
    op.drop_table("users")

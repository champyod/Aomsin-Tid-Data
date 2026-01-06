"""
Aomsin Tid Data - Interactive Dashboard

This dashboard provides an interactive interface for data analysis and visualization.
It works cross-platform on Windows and Linux (Arch-based, Nix, Fedora, etc.)
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path

# Page configuration
st.set_page_config(
    page_title="Aomsin Tid Data Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom CSS
st.markdown(
    """
    <style>
    .main {
        padding: 0rem 1rem;
    }
    .stMetric {
        background-color: #f0f2f6;
        padding: 10px;
        border-radius: 5px;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


def load_data(file_path=None):
    """Load data from file or generate sample data."""
    if file_path and Path(file_path).exists():
        try:
            df = pd.read_csv(file_path)
            return df
        except Exception as e:
            st.error(f"Error loading file: {e}")
            return None
    else:
        # Generate sample data
        np.random.seed(42)
        df = pd.DataFrame(
            {
                "date": pd.date_range("2024-01-01", periods=100),
                "category": np.random.choice(["A", "B", "C", "D"], 100),
                "value": np.random.randn(100).cumsum(),
                "amount": np.random.randint(10, 100, 100),
                "status": np.random.choice(["Active", "Inactive", "Pending"], 100),
            }
        )
        return df


def main():
    """Main dashboard function."""

    # Title and description
    st.title("📊 Aomsin Tid Data Analysis Dashboard")
    st.markdown(
        """
        Welcome to the interactive data analysis dashboard! 
        Upload your data or explore with sample data.
        """
    )

    # Sidebar
    st.sidebar.header("🔧 Configuration")

    # File uploader
    uploaded_file = st.sidebar.file_uploader(
        "Upload your CSV file", type=["csv"], help="Upload a CSV file to analyze"
    )

    # Load data
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file)
        st.sidebar.success("✅ File uploaded successfully!")
    else:
        df = load_data()
        st.sidebar.info("📝 Using sample data")

    if df is None:
        st.error("Failed to load data. Please check your file.")
        return

    # Sidebar filters
    st.sidebar.header("🔍 Filters")

    # Category filter
    categories = ["All"] + list(df["category"].unique())
    selected_category = st.sidebar.selectbox("Select Category", categories)

    # Date range filter (if date column exists)
    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"])
        min_date = df["date"].min().date()
        max_date = df["date"].max().date()
        date_range = st.sidebar.date_input(
            "Select Date Range",
            value=(min_date, max_date),
            min_value=min_date,
            max_value=max_date,
        )

        # Filter by date range
        if len(date_range) == 2:
            df = df[
                (df["date"].dt.date >= date_range[0])
                & (df["date"].dt.date <= date_range[1])
            ]

    # Filter by category
    if selected_category != "All":
        df = df[df["category"] == selected_category]

    # Main content
    tab1, tab2, tab3, tab4 = st.tabs(
        ["📈 Overview", "📊 Visualizations", "📋 Data Table", "📑 Statistics"]
    )

    # Tab 1: Overview
    with tab1:
        st.header("Overview")

        # Metrics
        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric(
                label="Total Records",
                value=len(df),
                delta=None,
            )

        with col2:
            if "value" in df.columns:
                st.metric(
                    label="Average Value",
                    value=f"{df['value'].mean():.2f}",
                    delta=None,
                )

        with col3:
            if "amount" in df.columns:
                st.metric(
                    label="Total Amount",
                    value=f"{df['amount'].sum():,.0f}",
                    delta=None,
                )

        with col4:
            st.metric(
                label="Categories",
                value=df["category"].nunique(),
                delta=None,
            )

        # Quick insights
        st.subheader("Quick Insights")
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("**📊 Category Distribution**")
            category_dist = df["category"].value_counts()
            fig = px.pie(
                values=category_dist.values,
                names=category_dist.index,
                title="Distribution by Category",
            )
            st.plotly_chart(fig, use_container_width=True)

        with col2:
            if "status" in df.columns:
                st.markdown("**📈 Status Distribution**")
                status_dist = df["status"].value_counts()
                fig = px.bar(
                    x=status_dist.index,
                    y=status_dist.values,
                    labels={"x": "Status", "y": "Count"},
                    title="Distribution by Status",
                )
                st.plotly_chart(fig, use_container_width=True)

    # Tab 2: Visualizations
    with tab2:
        st.header("Visualizations")

        # Time series plot
        if "date" in df.columns and "value" in df.columns:
            st.subheader("📈 Value Over Time")
            fig = px.line(
                df,
                x="date",
                y="value",
                color="category",
                title="Value Trend Over Time",
                labels={"value": "Value", "date": "Date"},
            )
            st.plotly_chart(fig, use_container_width=True)

        # Scatter plot
        if "value" in df.columns and "amount" in df.columns:
            st.subheader("🔵 Value vs Amount")
            fig = px.scatter(
                df,
                x="value",
                y="amount",
                color="category",
                size="amount",
                hover_data=["category"],
                title="Value vs Amount Analysis",
            )
            st.plotly_chart(fig, use_container_width=True)

        # Box plot
        if "category" in df.columns and "value" in df.columns:
            st.subheader("📦 Distribution by Category")
            fig = px.box(
                df,
                x="category",
                y="value",
                color="category",
                title="Value Distribution by Category",
            )
            st.plotly_chart(fig, use_container_width=True)

        # Histogram
        if "amount" in df.columns:
            st.subheader("📊 Amount Distribution")
            fig = px.histogram(
                df,
                x="amount",
                nbins=30,
                title="Amount Distribution Histogram",
                labels={"amount": "Amount", "count": "Frequency"},
            )
            st.plotly_chart(fig, use_container_width=True)

    # Tab 3: Data Table
    with tab3:
        st.header("Data Table")

        # Display options
        col1, col2 = st.columns([2, 1])
        with col1:
            search_term = st.text_input("🔍 Search in table", "")
        with col2:
            rows_to_show = st.selectbox("Rows per page", [10, 25, 50, 100], index=1)

        # Filter data by search term
        if search_term:
            mask = df.astype(str).apply(
                lambda x: x.str.contains(search_term, case=False, na=False)
            ).any(axis=1)
            filtered_df = df[mask]
        else:
            filtered_df = df

        # Display dataframe
        st.dataframe(
            filtered_df.head(rows_to_show),
            use_container_width=True,
            height=400,
        )

        # Download button
        csv = filtered_df.to_csv(index=False).encode("utf-8")
        st.download_button(
            label="📥 Download Data as CSV",
            data=csv,
            file_name="filtered_data.csv",
            mime="text/csv",
        )

        # Display info
        st.info(f"Showing {min(rows_to_show, len(filtered_df))} of {len(filtered_df)} rows")

    # Tab 4: Statistics
    with tab4:
        st.header("Statistical Summary")

        # Overall statistics
        st.subheader("📊 Overall Statistics")
        st.dataframe(df.describe(), use_container_width=True)

        # Group by category
        if "category" in df.columns:
            st.subheader("📈 Statistics by Category")
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            if len(numeric_cols) > 0:
                grouped_stats = (
                    df.groupby("category")[numeric_cols]
                    .agg(["mean", "median", "std", "min", "max"])
                    .round(2)
                )
                st.dataframe(grouped_stats, use_container_width=True)

        # Correlation matrix
        numeric_df = df.select_dtypes(include=[np.number])
        if len(numeric_df.columns) > 1:
            st.subheader("🔗 Correlation Matrix")
            corr_matrix = numeric_df.corr()
            fig = px.imshow(
                corr_matrix,
                text_auto=True,
                aspect="auto",
                color_continuous_scale="RdBu_r",
                title="Correlation Heatmap",
            )
            st.plotly_chart(fig, use_container_width=True)

    # Footer
    st.sidebar.markdown("---")
    st.sidebar.markdown(
        """
        ### About
        **Aomsin Tid Data Dashboard**
        
        A cross-platform data analysis tool built with Streamlit.
        
        Compatible with:
        - ✅ Windows
        - ✅ Linux (Arch, Nix, Fedora, etc.)
        - ✅ macOS
        
        Version: 0.1.0
        """
    )


if __name__ == "__main__":
    main()

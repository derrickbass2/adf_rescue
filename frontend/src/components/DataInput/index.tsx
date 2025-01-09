import React, { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { dashboardService } from "/Users/dbass/Documents/GitHub/adf_rescue/frontend/src/services/api";

// Define props for the DataInputForm component
interface DataInputFormProps {
    organizationId: string;
    onSubmit?: (data: InputFormData) => void;
}

// Define the shape of the form data
interface InputFormData {
    metricA: string;
    metricB: string;
    [key: string]: any; // Add this to allow additional dynamic fields if needed
}

// Example initial form data structure
const initialFormData: InputFormData = {
    metricA: "",
    metricB: "",
};

// Styled wrapper for the form
const FormWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
}));

// Main component
export const DataInputForm: React.FC<DataInputFormProps> = ({
                                                                organizationId,
                                                                onSubmit,
                                                            }) => {
    // State to hold form data
    const [formData, setFormData] = useState<InputFormData>(initialFormData);

    // Handle changes to form fields
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            // Call the API to update metrics and pass the form data
            await dashboardService.updateMetrics(organizationId, formData);

            // Trigger the onSubmit callback if provided
            onSubmit?.(formData);
        } catch (error) {
            console.error("Error updating metrics:", error);
        }
    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Example Form Field: Metric A */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Metric A"
                            name="metricA"
                            value={formData.metricA}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>

                    {/* Example Form Field: Metric B */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Metric B"
                            name="metricB"
                            value={formData.metricB}
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormWrapper>
    );
};
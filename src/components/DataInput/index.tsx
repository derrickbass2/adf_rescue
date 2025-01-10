import React, { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { dashboardService } from "../../services/api";

interface DataInputFormProps {
  organizationId: string;
  onSubmit?: (data: InputFormData) => void;
}

interface InputFormData {
  metricA: string;
  metricB: string;
  file?: File; // Add file to the form data
  [key: string]: any;
}

const initialFormData: InputFormData = {
  metricA: "",
  metricB: "",
};

const FormWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const DataInputForm: React.FC<DataInputFormProps> = ({ organizationId, onSubmit }) => {
  const [formData, setFormData] = useState<InputFormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const formDataToSend = { ...formData };
      if (file) {
        formDataToSend.file = file;
      }

      const payload = {
        metricId: "someMetricId", // Replace with actual metricId
        newValue: parseFloat(formDataToSend.metricA), // Convert to number
        ...formDataToSend,
      };

      await dashboardService.updateMetrics(organizationId, payload);

      onSubmit?.(formDataToSend);
    } catch (error) {
      console.error("Error updating metrics:", error);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <Button variant="contained" component="label" color="secondary">
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {file && <p>Selected File: {file.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormWrapper>
  );
};

export default DataInputForm;
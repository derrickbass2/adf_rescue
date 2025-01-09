import {Grid} from '@mui/material';
import {styled} from '@mui/material/styles';

// Creating a styled Grid container using Material-UI
const StyledGrid = styled(Grid)(({theme}: {
    theme: { spacing: (value: number) => string; palette: { background: { default: string } } }
}) => ({
    padding: theme.spacing(3), // Adds padding from theme spacing
    // Full viewport height removed as it conflicts with updated height
    // Removed overflow as it's redefined later for scrolling content
    backgroundColor: theme.palette.background.default, // Sets background from theme

    // Additional styles for scrolling and layout
    WebkitOverflowScrolling: 'touch', // Compatibility with mobile devices
    height: 'calc(100% - 64px)', // Accounts for a header height of 64px
    overflow: 'auto', // Enables scrollable content
    gap: theme.spacing(2), // Adds spacing between child elements
}));

export default StyledGrid;
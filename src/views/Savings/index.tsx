import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent,
  Button,
  Grid, 
  LinearProgress, 
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  PiggyBank, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar, 
  Target, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  PieChart
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { format } from 'date-fns';
import styles from './Savings.module.scss';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Sample financial goals data
const goalsData = [
  { 
    id: 1, 
    name: 'New Laptop', 
    target: 1500, 
    current: 950, 
    deadline: new Date('2023-10-15'),
    color: '#4C6EF5'
  },
  { 
    id: 2, 
    name: 'Vacation Fund', 
    target: 3000, 
    current: 1200, 
    deadline: new Date('2023-12-20'),
    color: '#FF8A65'
  },
  { 
    id: 3, 
    name: 'Emergency Fund', 
    target: 5000, 
    current: 4800, 
    deadline: new Date('2023-08-30'),
    color: '#2ED573'
  }
];

// Sample transactions data
const transactionsData = [
  { 
    id: 1, 
    type: 'expense', 
    category: 'Groceries', 
    amount: 85.20, 
    date: new Date('2023-06-10') 
  },
  { 
    id: 2, 
    type: 'expense', 
    category: 'Utilities', 
    amount: 120.50, 
    date: new Date('2023-06-08') 
  },
  { 
    id: 3, 
    type: 'income', 
    category: 'Salary', 
    amount: 2800, 
    date: new Date('2023-06-01') 
  },
  { 
    id: 4, 
    type: 'expense', 
    category: 'Dining Out', 
    amount: 45.80, 
    date: new Date('2023-06-05') 
  },
  { 
    id: 5, 
    type: 'expense', 
    category: 'Shopping', 
    amount: 120.30, 
    date: new Date('2023-06-03') 
  }
];

// Sample monthly budget data
const monthlyBudget = {
  income: 3200,
  expenses: 2300,
  categories: [
    { name: 'Housing', amount: 1000, budget: 1100, color: '#4C6EF5' },
    { name: 'Food', amount: 450, budget: 500, color: '#FF8A65' },
    { name: 'Transportation', amount: 200, budget: 250, color: '#2ED573' },
    { name: 'Utilities', amount: 180, budget: 200, color: '#FFC107' },
    { name: 'Entertainment', amount: 250, budget: 200, color: '#9C27B0' },
    { name: 'Others', amount: 220, budget: 250, color: '#7F8C8D' },
  ]
};

// Calculate expenses distribution for chart
const expensesChartData = {
  labels: monthlyBudget.categories.map(cat => cat.name),
  datasets: [
    {
      data: monthlyBudget.categories.map(cat => cat.amount),
      backgroundColor: monthlyBudget.categories.map(cat => cat.color),
      borderWidth: 0,
    },
  ],
};

// Chart options
const chartOptions = {
  cutout: '70%',
  plugins: {
    legend: {
      display: false
    }
  }
};

const Savings = () => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Calculate total income and expenses
  const totalIncome = transactionsData
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const totalExpenses = transactionsData
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  // Filter transactions based on active filter
  const filteredTransactions = activeFilter === 'all' 
    ? transactionsData 
    : transactionsData.filter(t => t.type === activeFilter);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };
  
  // Calculate remaining days
  const getDaysRemaining = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  
  return (
    <div className={styles.savingsContainer}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
          Financial Goals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your savings, expenses, and work towards your financial targets
        </Typography>
      </Box>
      
      {/* Monthly Overview */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          border: '1px solid', 
          borderColor: 'divider',
          borderRadius: 2
        }}
      >
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut data={expensesChartData} options={chartOptions} />
              <Box
                sx={{
                  position: 'absolute',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" fontWeight={600} color="text.secondary">
                  Balance
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  {formatCurrency(monthlyBudget.income - monthlyBudget.expenses)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Monthly Stats */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Monthly Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'success.light', 
                    color: 'success.dark',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <TrendingUp size={24} style={{ marginRight: 10 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        Income
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {formatCurrency(monthlyBudget.income)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'error.light', 
                    color: 'error.dark',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <TrendingDown size={24} style={{ marginRight: 10 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        Expenses
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {formatCurrency(monthlyBudget.expenses)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Budget Categories
            </Typography>
            
            {/* Budget Categories */}
            <Stack spacing={1.5}>
              {monthlyBudget.categories.map((category, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{category.name}</Typography>
                    <Typography variant="body2">
                      {formatCurrency(category.amount)} / {formatCurrency(category.budget)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(category.amount / category.budget) * 100} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: `${category.color}33`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: category.color
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Savings Goals */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={600}>
          Savings Goals
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<Plus size={18} />}
          size="small"
        >
          New Goal
        </Button>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {goalsData.map((goal) => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <Card
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[2]
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {goal.name}
                  </Typography>
                  <IconButton size="small">
                    <MoreHorizontal size={18} />
                  </IconButton>
                </Box>
                
                <Box sx={{ my: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {calculateProgress(goal.current, goal.target)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(goal.current, goal.target)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${goal.color}33`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: goal.color
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Chip
                    icon={<Target size={14} />}
                    label={`${formatCurrency(goal.target - goal.current)} to go`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Calendar size={14} />}
                    label={`${getDaysRemaining(goal.deadline)} days left`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Transactions */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight={600}>
            Recent Transactions
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Chip 
              label="All" 
              size="small" 
              onClick={() => setActiveFilter('all')}
              color={activeFilter === 'all' ? 'primary' : 'default'}
              variant={activeFilter === 'all' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="Income" 
              size="small" 
              onClick={() => setActiveFilter('income')}
              color={activeFilter === 'income' ? 'success' : 'default'}
              variant={activeFilter === 'income' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="Expenses" 
              size="small" 
              onClick={() => setActiveFilter('expense')}
              color={activeFilter === 'expense' ? 'error' : 'default'}
              variant={activeFilter === 'expense' ? 'filled' : 'outlined'}
            />
          </Stack>
        </Box>
        
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <List sx={{ p: 0 }}>
            {filteredTransactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                {index > 0 && <Divider />}
                <ListItem
                  secondaryAction={
                    <Typography 
                      variant="body1" 
                      fontWeight={600}
                      color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                    >
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </Typography>
                  }
                  sx={{ py: 2 }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: transaction.type === 'income' ? 'success.light' : 'error.light',
                        color: transaction.type === 'income' ? 'success.main' : 'error.main'
                      }}
                    >
                      {transaction.type === 'income' ? 
                        <ArrowUpRight size={18} /> : 
                        <ArrowDownRight size={18} />
                      }
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={transaction.category}
                    secondary={formatDate(transaction.date)}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      variant: 'body1'
                    }}
                    secondaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.secondary'
                    }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
      
      {/* Summary Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'primary.light',
          color: 'primary.dark'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <PiggyBank size={24} />
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Monthly Summary
            </Typography>
            <Typography variant="body2">
              Your savings rate this month is <strong>28%</strong> of your income. 
              You're on track to meet your financial goals.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Income
                </Typography>
                <Typography variant="body1" fontWeight={600} color="success.main">
                  {formatCurrency(totalIncome)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Expenses
                </Typography>
                <Typography variant="body1" fontWeight={600} color="error.main">
                  {formatCurrency(totalExpenses)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Savings
                </Typography>
                <Typography variant="body1" fontWeight={600} color="primary.main">
                  {formatCurrency(totalIncome - totalExpenses)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Savings; 
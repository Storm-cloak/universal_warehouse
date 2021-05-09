import { Doughnut } from "react-chartjs-2";
interface IProps {
  data: number[];
  labels?: string[];
  color: string[];
}

const PieChart = (props: IProps) => {
  console.log(props.labels);
  return (
    <Doughnut
      data={{
        labels: props.labels?.length ? [...props.labels] : [],
        datasets: [
          {
            label: "My First Dataset",
            data: [...props.data],
            backgroundColor: [...props.color],
            hoverOffset: 4,
          },
        ],
      }}
      height={320}
      width={320}
      options={{
        maintainAspectRatio: false,
        responsive: false,
        cutoutPercentage: 70,
        legend: {
          position: "right",
        },
      }}
    />
  );
};

export default PieChart;

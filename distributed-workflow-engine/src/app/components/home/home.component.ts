import { multi } from "./data";
import { ReportService } from "./../../services/report/report.service";
import { PerisitenceService } from "./../../services/persistence/perisitence.service";
import { Http } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { Router } from "@angular/router";
import { WorkflowDetailsService } from "../../services/workflow-details/workflow-details.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private authentication: AuthenticationService,
    private workflowService: WorkflowDetailsService
  ) {
    Object.assign(this, { multi });
  }

  single: any[];
  multi: any[];
  public workflows: any;

  workflowList: any[];
  taskWater: any;
  view: any[] = [1000, 250];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  // showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Workflow";
  showYAxisLabel = true;
  yAxisLabel = "Time";
  colorScheme = {
    domain: ["#ffffff", "#5590BF"]
  };
  ngOnInit() {
    console.log(navigator.onLine);
    this.load_workflows();
  }

  load_workflows() {
    return this.workflowService.getAllWorkflows().then(workflows => {
      this.workflows = workflows;
      this.loadHeatmap(workflows as any[]);
    });
  }

  showHeatMap = false;
  loadHeatmap(res) {
    this.workflowList = [];
    console.log(res.length);
    for (var i = 0; i < res.length; i++) {
      this.taskWater = {
        name: res[i]["workFlowName"],
        series: [
          {
            name: "Jan",
            value: 0
          },
          {
            name: "Feb",
            value: 0
          },
          {
            name: "Mar",
            value: 0
          },
          {
            name: "Apr",
            value: 0
          },
          {
            name: "May",
            value: 0
          },
          {
            name: "Jun",
            value: 0
          },
          {
            name: "Jul",
            value: 0
          },
          {
            name: "Aug",
            value: 0
          },
          {
            name: "Sep",
            value: 0
          },
          {
            name: "Oct",
            value: 0
          },
          {
            name: "Nov",
            value: 0
          },
          {
            name: "Dec",
            value: 0
          }
        ]
      };

      var Map = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
      };

      if (res[i]["executionTime"] != null) {
        for (var j = 0; j < res[i]["executionTime"].length; j++) {
          let mod = new Date(res[i]["executionTime"][j]).getMonth() + 1;
          for (let task of this.taskWater.series) {
            if (task.name == Map[mod]) {
              task.value++; 
            }
          } 
        }
      }
      this.workflowList.push(this.taskWater);
    }
    this.showHeatMap = true;
  }

  viewmodeexit(): void {
    this.workflowService.displayWorkflow = null;
  }

  onSelect(event) {
    console.log(event);
  }
}

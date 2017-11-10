package com.distributedpipeline.persistence.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="TASKLIBRARY")
public class TaskLibrary{
	
	@Id
	@NotNull
	private String taskName;
	private String inputType;
	private String outputType;
	
	
	
	/*--------------------- Getters and Setters for the fields -----------------------------*/
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getInputType() {
		return inputType;
	}
	public void setInputType(String inputType) {
		this.inputType = inputType;
	}
	public String getOutputType() {
		return outputType;
	}
	public void setOutputType(String outputType) {
		this.outputType = outputType;
	}
	
	
}
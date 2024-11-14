package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"time"
)

func main() {
	cypressDir := "../Cypress/"
	cmd := exec.Command("bash", "-c", fmt.Sprintf("cd %s && npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports,json=true", cypressDir))
	if output, err := cmd.CombinedOutput(); err != nil {
		fmt.Printf("Error running Cypress: %s\n", err)
		fmt.Printf("Output: %s\n", output)
		return
	}

	reportDir := filepath.Join(cypressDir, "cypress/reports")
	reportData := make([]map[string]interface{}, 0)

	err := filepath.Walk(reportDir, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(path) == ".json" {
			fileData, err := os.ReadFile(path)
			if err != nil {
				return err
			}
			var report map[string]interface{}
			json.Unmarshal(fileData, &report)
			reportData = append(reportData, report)
		}
		return nil
	})
	if err != nil {
		fmt.Printf("Error reading report data: %s\n", err)
		return
	}

	screenshotsDir := filepath.Join(cypressDir, "cypress/screenshots")
	screenshots := make(map[string]string)

	err = filepath.Walk(screenshotsDir, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(path) == ".png" {
			imgData, err := os.ReadFile(path)
			if err != nil {
				return err
			}

			screenshots[info.Name()] = base64.StdEncoding.EncodeToString(imgData)
		}
		return nil
	})
	if err != nil {
		fmt.Printf("Error reading screenshots: %s\n", err)
		return
	}

	payload := map[string]interface{}{
		"timestamp": time.Now(),
		"reports":   reportData,
		// "screenshots": screenshots,
	}
	fmt.Printf("Payload: %+v\n", payload)
}

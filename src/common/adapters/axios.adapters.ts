import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async post<T>(url: string, payload: any): Promise<T> {
    try {
      const { data } = await this.axios.post<T>(url, payload);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async put<T>(url: string, payload: any): Promise<T> {
    try {
      const { data } = await this.axios.put<T>(url, payload);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.delete<T>(url);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }

  async patch<T>(url: string, payload: any): Promise<T> {
    try {
      const { data } = await this.axios.patch<T>(url, payload);
      return data;
    } catch (error) {
      throw new Error('This is an error - Check logs');
    }
  }



}